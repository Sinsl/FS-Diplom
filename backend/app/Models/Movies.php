<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    use HasFactory;

    protected $fillable = [
        'date', 'start_time', 'halls_id', 'films_id'
    ];

    public function tickets() {
        return $this->hasMany(Ticket::class);
    }
    public function halls()
    {
        return $this->belongsTo(Halls::class);
    }
    public function films()
    {
        return $this->belongsTo(Films::class);
    }
}
