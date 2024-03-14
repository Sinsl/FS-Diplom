<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TicketSeats;

class TicketSeatsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TicketSeats::create([
            'seat_id' => 35,
            'ticket_id' => 1
        ]);
        TicketSeats::create([
            'seat_id' => 36,
            'ticket_id' => 1
        ]);
        TicketSeats::create([
            'seat_id' => 44,
            'ticket_id' => 2
        ]);
        TicketSeats::create([
            'seat_id' => 45,
            'ticket_id' => 2
        ]);
    }
}
