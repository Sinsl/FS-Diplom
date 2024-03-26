<?php

namespace App\Http\Controllers;

use App\Models\Films;
use App\Models\Halls;
use App\Models\Movies;
use App\Models\Seats;
use App\Models\CategorySeats;
use App\Models\Ticket;
use App\Models\TicketSeats;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use URL;

class AdminController extends Controller
{
    public function getUser(Request $request) {
        $user = $request->user();
        return response()->json(['name' => $user->name]);
    }

    public function userLogout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response('ok', 200);
    }
    public function getHalls()
    {
        $halls = Halls::all();
        sleep(2);
        return response()->json($halls);
    }

    public function updateOpen(Request $request) {
        $is_open = $request->all();
        $halls = Halls::query()->update(['is_open' => $is_open['is_open']]);
        return response()->json(['count_update' => $halls]);
    }
    
    public function createHall(Request $request)
    {
        $data = $request->json()->all();

        $hall = new Halls;
        $hall->fill($data);
        $hall->save();
        $id = $hall->id;
        $cat_seats = new CategorySeats;
        $cat_seats->fill(['title' => 'simple', 'price' => 0, 'hall_id' => $id]);
        $cat_seats->save();
        $cat_seats_vip = new CategorySeats;
        $cat_seats_vip->fill(['title' => 'vip', 'price' => 0, 'hall_id' => $id]);
        $cat_seats_vip->save();
        $seat = new Seats;
        $seat->fill(['row' => 1, 'seat' => 1, 'halls_id' => $id, 'category_seats_id' => $cat_seats->id]);
        $seat->save();

        return response('', 200);
    }

    public function deleteHall($id)
    {

        $hall = Halls::find($id);
        $hall->seats()->delete();
        $hall->movies()->delete();
        $hall->delete();
        $cat_seats = CategorySeats::where('hall_id', $id)->delete();
        
        return response('', 200);
    }
    
    public function getSeatsHall($id)
    {
        $seats = Seats::where('halls_id', $id)->get();
        $cat = CategorySeats::where('hall_id', $id)->get();
        return response()->json(['seats' => $seats, 'cat' => $cat]);
    }

    public function updateSeats(Request $request) 
    {
        $req = $request->all();
        $hall = Halls::find($req['hall']['id']);
        $chandes = $request['changes'];
        $news = $request['news'];
        $deletes = $request['deletes'];
        $size = $request['size'];
        if ($hall->rows != $size['row'] || $request->count_seat != $size['seats']) {
            $hall->fill(['rows' => $size['row'], 'count_seat' => $size['seats']]);
            $hall->save();
        }
        $records_update = 0;
        if(count($chandes) > 0) {
            foreach ($chandes as $elem) {
                    $seat = Seats::find($elem['id']);
                    $seat->fill([
                        'active' => $elem['active'],
                        'halls_id' => $elem['halls_id'],
                        'category_seats_id' => $elem['category_seats_id']
                    ]);
                    $seat->save();
                    $records_update += 1;
            }
        }
        if (count($deletes) > 0) {
            foreach ($deletes as $elem) {
                $seat = Seats::find($elem['id']);
                $seat->delete();
                $records_update += 1;
            }
        }
        if (count($news) > 0) {
            foreach ($news as $elem) {
                $seat = new Seats;
                $seat->fill([
                    'row' => $elem['row'],
                    'seat' => $elem['seat'],
                    'active' => $elem['active'],
                    'halls_id' => $elem['halls_id'],
                    'category_seats_id' => $elem['category_seats_id']
                ]);
                $seat->save();
                $records_update += 1;
            }
        }

        return response()->json(['records_update' => $records_update]);
    }

    
    public function getCatSeatsHall($id)
    {
        $cat = CategorySeats::where('hall_id', $id)->get();
        return response()->json($cat);
    }

    
    public function updateCat(Request $request) 
    {
        $req = $request->all();
        $hall_id = $req['hallId'];
        $cats = CategorySeats::where('hall_id', $hall_id)->get();

        foreach ($cats as $elem) {
            if ($elem->title == 'simple') {
                $elem->fill(['price' => $req['price']['simple']]);
            }
            if ($elem->title == 'vip') {
                $elem->fill(['price' => $req['price']['vip']]);
            }
            $elem->save();
        }
        return response()->json($cats);
    }

    public function getFilms()
    {
        $films = Films::all();

        return response()->json($films);
    }

    public function getMovies(Request $request, $id)
    {
        // $time_start = date('Y-m-d', strtotime("last Monday +1 week"));
        $time_start = date('Y-m-d', strtotime($request->query('mon')));
        $movies = Movies::where('halls_id', $id)
                        ->where('date', $time_start)->get();
        foreach ($movies as $movie) {
            $movie->films;
        }

        return response()->json($movies);
    }

    public function createUpdateFilmMovie(Request $request)
    {
        $data = $request->json()->all();
        $new_film = $data['new_film'];
        $new_movie = $data['new_movie'];
        $update_movie = $data['update_movie'];
        $records_update = 0;
        $result = [];
        $change_film_id = [];

        if (count($new_film) > 0) {
            foreach ($new_film as $film) {
                $save_film = new Films;
                $save_film->fill([
                    'title' => $film['title'],
                    'description' => $film['description'],
                    'url_img' => $film['url_img'],
                    'duration' => $film['duration'],
                    'country' => $film['country'],
                    'bg_color' => $film['bg_color']
                ]);
                $save_film->save();
                $change_film_id[] = [$film['id'], $save_film->id];
                $records_update += 1;                
            }
        }
        var_dump($new_movie);
        if (count($new_movie) > 0) {
            foreach ($new_movie as $movie) {
                foreach ($change_film_id as $item) {
                    if ($movie['films_id'] == $item[0]) {
                        $movie['films_id'] = $item[1];
                    }
                }
                $count_day = 0;
                while ($count_day < 7) {
                    $movie_date = date('Y-m-d', strtotime($movie['date'] . ' +' . $count_day . ' day'));
                    $new_movie = new Movies;
                    $new_movie->fill([
                        'date' => $movie_date,
                        'start_time' => $movie['start_time'],
                        'halls_id' => $movie['halls_id'],
                        'films_id' => $movie['films_id']
                ]);
                $new_movie->save();
                $count_day += 1;
                $records_update += 1;
                }
            }
        }

        if (count($update_movie) > 0) {
            foreach ($update_movie as $movie) {
                $old_movie = Movies::find($movie['id']);
                $movie_date = $old_movie->date;
                $movie_time = $old_movie->start_time;
                                
                $count_day = 0;
                while ($count_day < 7) {
                    $mov_date = date('Y-m-d', strtotime($movie_date . ' +' . $count_day . ' day'));                    
                    $update_mov = Movies::where('date', $mov_date)
                                        ->where('halls_id', $movie['halls_id'])
                                        ->where('start_time', $movie_time)
                                        ->update(['start_time' => $movie['start_time']]);
                    $count_day += 1;
                    $records_update += 1;
                }
            }
        }

        return response()->json(['update' => $records_update]);
    }

    
}
