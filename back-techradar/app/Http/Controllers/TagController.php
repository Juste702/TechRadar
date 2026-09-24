<?php

namespace App\Http\Controllers;

use App\Models\Article;

class TagController extends Controller
{
    private const LIMIT = 15;

    /**
     * Tags les plus fréquents, triés par nombre d'articles.
     */
    public function index()
    {
        $tags = Article::whereNotNull('tags')
            ->pluck('tags')
            ->flatten()
            ->countBy()
            ->sortDesc()
            ->take(self::LIMIT)
            ->map(fn ($count, $name) => ['name' => $name, 'count' => $count])
            ->values();

        return response()->json($tags);
    }
}
