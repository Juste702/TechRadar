<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            // Langue d'origine détectée par DeepL (ex. "en", "fr")
            $table->string('language', 5)->nullable()->after('tags');
            // {"fr": {"title": "...", "summary": "..."}, "en": {...}} — sans la langue d'origine
            $table->json('translations')->nullable()->after('language');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['language', 'translations']);
        });
    }
};
