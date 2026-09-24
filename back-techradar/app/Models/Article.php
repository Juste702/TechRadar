<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'url',
        'source',
        'summary',
        'tags',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'translations' => 'array',
        'published_at' => 'datetime',
    ];
}
