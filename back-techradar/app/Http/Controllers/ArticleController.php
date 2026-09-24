<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderByDesc('published_at')
            ->get(['id', 'title', 'url', 'source', 'summary', 'tags', 'published_at']);

        return response()->json($articles);
    }
}
