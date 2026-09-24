<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Http;

class ArticleTranslator
{
    /** Langues proposées sur le site => code cible attendu par DeepL */
    private const TARGETS = [
        'fr' => 'FR',
        'en' => 'EN-US',
    ];

    public function isConfigured(): bool
    {
        return filled(config('services.deepl.key'));
    }

    /**
     * Traduit l'article dans les langues du site autres que sa langue d'origine, puis l'enregistre.
     */
    public function translate(Article $article): void
    {
        $result = $this->translationsFor($article->title, $article->summary);

        $article->language = $result['language'];
        $article->translations = $result['translations'];
        $article->save();
    }

    /**
     * @return array{language: string, translations: array<string, array{title: string, summary: string|null}>}
     */
    public function translationsFor(string $title, ?string $summary): array
    {
        $texts = $summary === null ? [$title] : [$title, $summary];

        // Le premier appel sert aussi à détecter la langue d'origine
        $first = $this->deepl($texts, self::TARGETS['fr']);
        $language = $first['language'];

        $translations = [];
        foreach (self::TARGETS as $locale => $deeplCode) {
            if ($locale === $language) {
                continue;
            }
            $translated = $locale === 'fr' ? $first['texts'] : $this->deepl($texts, $deeplCode)['texts'];
            $translations[$locale] = [
                'title' => $translated[0],
                'summary' => $translated[1] ?? null,
            ];
        }

        return ['language' => $language, 'translations' => $translations];
    }

    /**
     * @param  list<string>  $texts
     * @return array{language: string, texts: list<string>}
     */
    private function deepl(array $texts, string $targetLang): array
    {
        $translations = Http::timeout(15)
            ->withHeaders(['Authorization' => 'DeepL-Auth-Key '.config('services.deepl.key')])
            ->post(rtrim(config('services.deepl.url'), '/').'/v2/translate', [
                'text' => $texts,
                'target_lang' => $targetLang,
            ])
            ->throw()
            ->json('translations');

        return [
            'language' => strtolower($translations[0]['detected_source_language']),
            'texts' => array_column($translations, 'text'),
        ];
    }
}
