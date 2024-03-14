<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_pay', 'movies_id'
    ];

    public function ticketSeats()
    {
        return $this->hasMany(TicketSeats::class);
    }
    
    public function movies()
    {
        return $this->belongsTo(Movies::class);
    }
}
