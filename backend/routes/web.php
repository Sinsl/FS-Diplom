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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::prefix('api')->group(function() {

    Route::prefix('sunctum')->group(function() {
        Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
        Route::post('token', [\App\Http\Controllers\AuthController::class, 'token']);
    });

    Route::middleware('auth:sanctum')->prefix('admin')->group(function() {

        Route::get('user', [\App\Http\Controllers\AdminController::class, 'getUser']);    
        Route::get('halls', [\App\Http\Controllers\AdminController::class, 'getHalls']);
        Route::put('halls/change-open', [\App\Http\Controllers\AdminController::class, 'updateOpen']);
        Route::get('films', [\App\Http\Controllers\AdminController::class, 'getFilms']);
        
        Route::post('create/hall', [\App\Http\Controllers\AdminController::class, 'createHall']);
        Route::post('film/movie', [\App\Http\Controllers\AdminController::class, 'createUpdateFilmMovie']);
        Route::delete('delete/hall/{id}', [\App\Http\Controllers\AdminController::class, 'deleteHall']);
        Route::get('hall/{id}/movies', [\App\Http\Controllers\AdminController::class, 'getMovies']);
        Route::get('hall/{id}/seats', [\App\Http\Controllers\AdminController::class, 'getSeatsHall']);
        Route::get('hall/{id}/cat-seats', [\App\Http\Controllers\AdminController::class, 'getCatSeatsHall']);
        Route::put('hall/seats/update', [\App\Http\Controllers\AdminController::class, 'updateSeats']);
        Route::put('hall/cat-seats/update', [\App\Http\Controllers\AdminController::class, 'updateCat']);

    });  
    
    Route::get('films', [\App\Http\Controllers\ApiController::class, 'getFilms']);
    Route::get('movies', [\App\Http\Controllers\ApiController::class, 'getMoviesFilm']);
    Route::post('ticket/create', [\App\Http\Controllers\ApiController::class, 'ticketCreate']);
    Route::get('qr-codes', [\App\Http\Controllers\QrCodeGeneratorController::class, 'generate']);
    Route::get('movies/{id}', [\App\Http\Controllers\ApiController::class, 'MovieShow']);
    Route::get('ticket/{id}', [\App\Http\Controllers\ApiController::class, 'getTicketParams']);
    Route::get('halls/{id}/seats', [\App\Http\Controllers\ApiController::class, 'getSeatsHall']);
    Route::get('movie/{id}/tickets', [\App\Http\Controllers\ApiController::class, 'getMovieTicket']);
});






