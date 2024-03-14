<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategorySeats;

class CategorySeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CategorySeats::create([
            'title' => 'simple',
            'price' => 300,
            'hall_id' => 1
        ]);
        CategorySeats::create([
            'title' => 'vip',
            'price' => 450,
            'hall_id' => 1
        ]);
        CategorySeats::create([
            'title' => 'simple',
            'price' => 200,
            'hall_id' => 2
        ]);
        CategorySeats::create([
            'title' => 'vip',
            'price' => 380,
            'hall_id' => 2
        ]);
    }
}
