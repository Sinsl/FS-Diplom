<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorySeats extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'price', 'hall_id'
    ];

    public function seats() {
        return $this->hasMany(Seats::class);
    }
}
