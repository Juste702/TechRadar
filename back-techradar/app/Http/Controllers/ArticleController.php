<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    private const PER_PAGE = 12;

    public function index(Request $request)
    {
        $validated = $request->validate([
            'tag' => ['nullable', 'string', 'max:50'],
        ]);

        $articles = Article::query()
            ->when($validated['tag'] ?? null, fn ($query, $tag) => $query->whereJsonContains('tags', $tag))
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate(self::PER_PAGE, ['id', 'title', 'url', 'source', 'summary', 'tags', 'language', 'translations', 'published_at'])
            ->withQueryString();

        return response()->json($articles);
    }
}
