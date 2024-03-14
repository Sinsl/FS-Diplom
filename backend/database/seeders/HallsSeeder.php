<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Halls;

class HallsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Halls::create([
            'title' => 'Зал 1',
            'rows' => 10,
            'count_seat' => 8,
            'is_open' => true
        ]);

        Halls::create([
            'title' => 'Зал 2',
            'rows' => 8,
            'count_seat' => 6,
            'is_open' => true
        ]);
    }
}
