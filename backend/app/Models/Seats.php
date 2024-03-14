<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seats extends Model
{
    use HasFactory;

    protected $fillable = [
        'row', 'seat', 'active', 'halls_id', 'category_seats_id'
    ];

    protected $with = ['category_seats'];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
    public function halls()
    {
        return $this->belongsTo(Halls::class);
    }
    public function category_seats()
    {
        return $this->belongsTo(CategorySeats::class);
    }
}
