<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Films extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'url_img', 'duration', 'country'
    ];

    public function movies() {
        return $this->hasMany(Movies::class);
    }
}
