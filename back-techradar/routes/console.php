<?php

use App\Models\Article;
use App\Services\ArticleFetcher;
use App\Services\ArticleTranslator;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    app(ArticleFetcher::class)->fetchFromDevTo();
})->hourly();

Artisan::command('articles:translate', function (ArticleTranslator $translator) {
    if (! $translator->isConfigured()) {
        $this->error('DEEPL_API_KEY est absente du fichier .env');

        return 1;
    }

    $articles = Article::whereNull('translations')->get();
    $failures = 0;

    $this->withProgressBar($articles, function (Article $article) use ($translator, &$failures) {
        try {
            $translator->translate($article);
        } catch (Throwable $e) {
            $failures++;
            report($e);
        }
    });

    $this->newLine();
    $this->info(($articles->count() - $failures)." article(s) traduit(s), {$failures} échec(s).");

    return $failures === 0 ? 0 : 1;
})->purpose('Traduit les articles qui n\'ont pas encore de traduction');

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
