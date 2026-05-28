<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Http;

class ArticleFetcher
{
    public function fetchFromDevTo(): void
    {
        $response = Http::get('https://dev.to/api/articles', [
            'tag' => 'webdev',
            'per_page' => 10,
        ]);

        $articles = $response->json();

        foreach ($articles as $article) {
            Article::updateOrCreate(
                ['url' => $article['url']],
                [
                    'title' => $article['title'],
                    'source' => 'devto',
                    'published_at' => \Carbon\Carbon::parse($article['published_at']),
                ]
            );
        }
    }
}
