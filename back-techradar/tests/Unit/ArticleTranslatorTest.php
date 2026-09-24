<?php

namespace Tests\Unit;

use App\Services\ArticleTranslator;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ArticleTranslatorTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.deepl.key' => 'test-key:fx',
            'services.deepl.url' => 'https://api-free.deepl.com',
        ]);
    }

    /**
     * Simule DeepL : renvoie "[CIBLE] texte" et la langue source donnée.
     */
    private function fakeDeepl(string $detectedSource): void
    {
        Http::fake([
            'api-free.deepl.com/v2/translate' => function (Request $request) use ($detectedSource) {
                return Http::response([
                    'translations' => array_map(fn ($text) => [
                        'detected_source_language' => $detectedSource,
                        'text' => "[{$request['target_lang']}] {$text}",
                    ], $request['text']),
                ]);
            },
        ]);
    }

    public function test_english_article_is_translated_to_french_only(): void
    {
        $this->fakeDeepl('EN');

        $result = (new ArticleTranslator)->translationsFor('Hello', 'A summary');

        $this->assertSame('en', $result['language']);
        $this->assertSame(
            ['fr' => ['title' => '[FR] Hello', 'summary' => '[FR] A summary']],
            $result['translations'],
        );
        Http::assertSentCount(1);
        Http::assertSent(fn (Request $request) => $request->hasHeader('Authorization', 'DeepL-Auth-Key test-key:fx'));
    }

    public function test_french_article_is_translated_to_english(): void
    {
        $this->fakeDeepl('FR');

        $result = (new ArticleTranslator)->translationsFor('Bonjour', 'Un résumé');

        $this->assertSame('fr', $result['language']);
        $this->assertSame(
            ['en' => ['title' => '[EN-US] Bonjour', 'summary' => '[EN-US] Un résumé']],
            $result['translations'],
        );
        Http::assertSentCount(2);
    }

    public function test_other_language_is_translated_to_both(): void
    {
        $this->fakeDeepl('ES');

        $result = (new ArticleTranslator)->translationsFor('Hola', null);

        $this->assertSame('es', $result['language']);
        $this->assertSame(['fr', 'en'], array_keys($result['translations']));
        $this->assertNull($result['translations']['fr']['summary']);
    }

    public function test_missing_summary_sends_only_the_title(): void
    {
        $this->fakeDeepl('EN');

        (new ArticleTranslator)->translationsFor('Hello', null);

        Http::assertSent(fn (Request $request) => $request['text'] === ['Hello']);
    }

    public function test_deepl_error_is_thrown(): void
    {
        Http::fake(['api-free.deepl.com/*' => Http::response(['message' => 'Quota exceeded'], 456)]);

        $this->expectException(\Illuminate\Http\Client\RequestException::class);

        (new ArticleTranslator)->translationsFor('Hello', null);
    }

    public function test_is_not_configured_without_key(): void
    {
        config(['services.deepl.key' => null]);

        $this->assertFalse((new ArticleTranslator)->isConfigured());
    }
}
