<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Halls extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'row', 'count_seat', 'is_open'
    ];

    public function movies()
    {
        return $this->hasMany(Movies::class);
    }

    public function seats()
    {
        return $this->hasMany(Seats::class);
    }
}
