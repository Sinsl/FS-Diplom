<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Films;

class FilmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Films::create([
            'title' => 'Звездные войны',
            'description' => 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.',
            'url_img' => 'img/poster1.jpg',
            'duration' => 130,
            'country' => 'США'
        ]);

        Films::create([
            'title' => 'Аватар',
            'description' => 'История рассказывает о Джейке Салли, лишившемся возможности ходить морпехе в отставке. По трагической случайности, его брата-близнеца, который должен был стать частью инопланетного проекта, убивают в уличной драке. Вместо него Джейку предоставляется возможность стать оператором так называемого «аватара», искусственно выращенного гибрида человека и инопланетного существа нави.',
            'url_img' => 'img/img_avatar.jpg',
            'duration' => 162,
            'country' => 'США'
        ]);

        Films::create([
            'title' => 'Альфа',
            'description' => '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.',
            'url_img' => 'img/poster2.jpg',
            'duration' => 96,
            'country' => 'Франция'
        ]);
    }
}
