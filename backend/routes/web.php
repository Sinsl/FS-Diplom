<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/admin/halls', [\App\Http\Controllers\AdminController::class, 'getHalls']);

Route::post('/api/admin/create/hall', [\App\Http\Controllers\AdminController::class, 'createHall']);
Route::delete('/api/admin/delete/hall/{id}', [\App\Http\Controllers\AdminController::class, 'deleteHall']);
Route::get('/api/admin/hall/{id}/seats', [\App\Http\Controllers\AdminController::class, 'getSeatsHall']);
Route::get('/api/admin/hall/{id}/cat-seats', [\App\Http\Controllers\AdminController::class, 'getCatSeatsHall']);
Route::put('/api/admin/hall/seats/update', [\App\Http\Controllers\AdminController::class, 'updateSeats']);

Route::get('/api/films', [\App\Http\Controllers\ApiController::class, 'getFilms']);
Route::get('/api/movies', [\App\Http\Controllers\ApiController::class, 'getMoviesFilm']);
Route::post('/api/ticket/create', [\App\Http\Controllers\ApiController::class, 'ticketCreate']);
Route::get('/api/qr-codes', [\App\Http\Controllers\QrCodeGeneratorController::class, 'generate']);
Route::get('/api/movies/{id}', [\App\Http\Controllers\ApiController::class, 'MovieShow']);
Route::get('/api/ticket/{id}', [\App\Http\Controllers\ApiController::class, 'getTicketParams']);
Route::get('/api/halls/{id}/seats', [\App\Http\Controllers\ApiController::class, 'getSeatsHall']);
Route::get('/api/movie/{id}/tickets', [\App\Http\Controllers\ApiController::class, 'getMovieTicket']);

