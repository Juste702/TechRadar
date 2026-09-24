<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\TagController;

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/tags', [TagController::class, 'index']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});
