Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});
