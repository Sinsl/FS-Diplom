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
    public function getHalls()
    {
        $halls = Halls::all();
        sleep(2);
        return response()->json($halls);
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
    
}
