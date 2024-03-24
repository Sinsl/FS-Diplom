<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Films extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'url_img', 'duration', 'country', 'bg_color'
    ];

    public function movies() {
        return $this->hasMany(Movies::class);
    }
}
