<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all(['id', 'title', 'url', 'summary', 'published_at']);

        return response()->json($articles);
    }
}
