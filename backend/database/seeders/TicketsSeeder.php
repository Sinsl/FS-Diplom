<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ticket;

class TicketsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ticket::create([
            'is_pay' => true,
            'qrcode_url' => '/qrcode/qrc-1.svg',
            'movies_id' => 3
        ]);

        Ticket::create([
            'is_pay' => true,
            'qrcode_url' => '/qrcode/qrc-2.svg',
            'movies_id' => 3
        ]);
    }
}
