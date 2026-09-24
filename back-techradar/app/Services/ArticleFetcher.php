<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ArticleFetcher
{
    private const DEVTO_TAGS = ['webdev', 'javascript', 'php', 'devops', 'ai'];

    private const PER_TAG = 10;

    public function fetchFromDevTo(): void
    {
        foreach (self::DEVTO_TAGS as $tag) {
            $response = Http::timeout(10)->get('https://dev.to/api/articles', [
                'tag' => $tag,
                'per_page' => self::PER_TAG,
            ]);

            if ($response->failed()) {
                Log::warning("Dev.to fetch failed for tag {$tag}", ['status' => $response->status()]);
                continue;
            }

            foreach ($response->json() as $article) {
                Article::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'source' => 'devto',
                        'summary' => $article['description'] ?: null,
                        'tags' => $article['tag_list'] ?? [],
                        'published_at' => \Carbon\Carbon::parse($article['published_at']),
                    ]
                );
            }
        }
    }
}
