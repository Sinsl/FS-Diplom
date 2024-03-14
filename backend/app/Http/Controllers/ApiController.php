<?php

namespace App\Http\Controllers;

use App\Http\Controllers\QrCodeGeneratorController;
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

class ApiController extends Controller
{
    public function getFilms(Request $request)
    {
        $date_params = $request->query('date');
        $films = Films::whereHas('movies', function (Builder $query) use($date_params){
            $query->where('date', '=', $date_params);
        })->get();
        return response()->json($films);
    }

    public function getMoviesFilm(Request $request)
    {
        $date_params = $request->query('date');
        $film_id = $request->query('filmId');
        $movies = Movies::join('halls', 'halls.id', '=', 'movies.halls_id')
                ->where('movies.films_id', $film_id)
                ->where('movies.date', $date_params)
                ->get(['movies.*', 'halls.title']);
        return response()->json($movies);
    }

    public function MovieShow($id)
    {
        $movie = Movies::find($id);
        $movie->halls;
        $movie->films;    
        return response()->json($movie);
    }

    public function ticketCreate(Request $request)
    {
        $req = $request->json()->all();

        $data = [
            'is_pay' => true,
            'movies_id' => $req['movieId']
        ];
        $ticket = new Ticket;
        $ticket->fill($data);
        $ticket->save();
        $id = $ticket->id;
        foreach ($req['seats'] as $seat_id) {
            $ticket_seat = new TicketSeats;
            $ticket_seat->fill(['seat_id' => $seat_id, 'ticket_id' => $id]);
            $ticket_seat->save();
        }        
        return redirect()->action(
            [QrCodeGeneratorController::class, 'generate'], ['id' => $id]
        );               
    }

    

    public function getSeatsHall($id)
    {
        $seats = Seats::where('halls_id', $id)->get();
        $cat_seats = CategorySeats::where('hall_id', $id)->get();
        $result = [
            'seats' => $seats,
            'cat_seats' => $cat_seats
        ];
        return response()->json($result);
    }

    public function getMovieTicket($id)
    {
        $tickets = Ticket::where('movies_id', $id)->get();
        foreach ($tickets as $ticket) {
            $ticket->ticketSeats;
        }
        return response()->json($tickets);
    }

    public function getTicketParams($id)
    {
        $ticket = Ticket::find($id);
        $ticket->movies->halls;
        $ticket->movies->films;
        $seat_arr = $ticket->ticketSeats;
        $seats_id = [];
        foreach ($seat_arr as $seat) {
            $seats_id[] = $seat->seat_id;
        }
        $seats_temp = Seats::find($seats_id);
        $seats = [];
        foreach ($seats_temp as $seat) {
            $temp = [
                'seat_id' => $seat->id,
                'seat_row' => $seat->row,
                'seat_seat' => $seat->seat,
                'seat_cat' => $seat->category_seats->title,
                'seat_price' => $seat->category_seats->price,
            ];
            $seats[] = $temp;
        }
        $result = [
            'ticket_id' => $ticket->id,
            'ticket_is_pay' => $ticket->is_pay,
            'ticket_qrcode_url' => URL::to('/') . '/qrcode/qrc-' . $ticket->id . '.svg',
            'movie_date' => $ticket->movies->date,
            'movie_time' => $ticket->movies->start_time,
            'hall_title' => $ticket->movies->halls->title,
            'film_title' => $ticket->movies->films->title,
            'seats' => $seats
        ];
        return response()->json($result);
    }

       

}
