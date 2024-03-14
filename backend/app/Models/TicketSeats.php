<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketSeats extends Model
{
    use HasFactory;

    protected $fillable = [
        'seat_id', 'ticket_id'
    ];

    public function ticket() {
        return $this->belongsTo(Ticket::class);
    }
}
