<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class ArticleFetcher
{
    private const DEVTO_TAGS = ['webdev', 'javascript', 'php', 'devops', 'ai'];

    private const PER_TAG = 10;

    public function __construct(private ArticleTranslator $translator) {}

    public function fetchFromDevTo(): void
    {
        $canTranslate = $this->translator->isConfigured();
        if (! $canTranslate) {
            Log::info('DEEPL_API_KEY absente : les articles ne seront pas traduits');
        }

        foreach (self::DEVTO_TAGS as $tag) {
            $response = Http::timeout(10)->get('https://dev.to/api/articles', [
                'tag' => $tag,
                'per_page' => self::PER_TAG,
            ]);

            if ($response->failed()) {
                Log::warning("Dev.to fetch failed for tag {$tag}", ['status' => $response->status()]);
                continue;
            }

            foreach ($response->json() as $data) {
                $article = Article::updateOrCreate(
                    ['url' => $data['url']],
                    [
                        'title' => $data['title'],
                        'source' => 'devto',
                        'summary' => $data['description'] ?: null,
                        'tags' => $data['tag_list'] ?? [],
                        'published_at' => \Carbon\Carbon::parse($data['published_at']),
                    ]
                );

                if ($canTranslate && $this->needsTranslation($article)) {
                    $this->translateSafely($article);
                }
            }
        }
    }

    /**
     * On ne paie la traduction qu'une fois : nouvel article, texte modifié, ou échec précédent.
     */
    private function needsTranslation(Article $article): bool
    {
        return $article->wasRecentlyCreated
            || $article->wasChanged(['title', 'summary'])
            || $article->translations === null;
    }

    private function translateSafely(Article $article): void
    {
        try {
            $this->translator->translate($article);
        } catch (Throwable $e) {
            // L'article reste enregistré sans traduction ; il sera retenté au prochain passage
            Log::warning("DeepL translation failed for article {$article->id}", ['error' => $e->getMessage()]);
        }
    }
}
