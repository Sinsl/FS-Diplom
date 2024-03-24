<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movies;

class MoviesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // public function getDate() {
    //     $time = strtotime('+2 days', time());
    //     return date('Y-m-d', $time);
    // }
    public function run(): void
    {

        $time_start = date('Y-m-d', strtotime("last Monday +1 week"));
        $count_day = 0;

        while ($count_day < 7) {
            $movie_date = date('Y-m-d', strtotime($time_start . ' +' . $count_day . ' day'));
            Movies::create([
                'date' => $movie_date,
                'start_time' => '09:00',
                'halls_id' => 1,
                'films_id' => 1
            ]);
            Movies::create([
                'date' => $movie_date,
                'start_time' => '15:00',
                'halls_id' => 1,
                'films_id' => 1
            ]);
            Movies::create([
                'date' => $movie_date,
                'start_time' => '12:00',
                'halls_id' => 1,
                'films_id' => 2
            ]);
            Movies::create([
                'date' => $movie_date,
                'start_time' => '18:00',
                'halls_id' => 1,
                'films_id' => 2
            ]);

            Movies::create([
                'date' => $movie_date,
                'start_time' => '00:00',
                'halls_id' => 2,
                'films_id' => 1
            ]);
            Movies::create([
                'date' => $movie_date,
                'start_time' => '12:00',
                'halls_id' => 2,
                'films_id' => 1
            ]);
            Movies::create([
                'date' => $movie_date,
                'start_time' => '15:00',
                'halls_id' => 2,
                'films_id' => 2
            ]);
            Movies::create([
                'date' => $movie_date,
                'start_time' => '18:00',
                'halls_id' => 2,
                'films_id' => 2
            ]);
            


            $count_day += 1;
        }
        // $movie_date = $this->getDate();
        


    }
}
