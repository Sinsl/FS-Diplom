<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Seats;

class SeatsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($r = 1; $r < 11; $r++) {
            for ($s = 1; $s < 9; $s++) {
                Seats::create([
                    'row' => $r,
                    'seat' => $s,
                    'halls_id' => 1,
                    'category_seats_id' => 1,
                ]);
            }
        }

        for ($r = 1; $r < 9; $r++) {
            for ($s = 1; $s < 7; $s++) {
                Seats::create([
                    'row' => $r,
                    'seat' => $s,
                    'halls_id' => 2,
                    'category_seats_id' => 3,
                ]);
            }
        }
        
    }
}
