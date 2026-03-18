<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CampusSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('campus')->insert([
            [
                'campus_name' => 'Main Campus',
                'campus_code' => 'MAIN',
                'address' => 'University Avenue, City Center',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'campus_name' => 'North Campus',
                'campus_code' => 'NORTH',
                'address' => 'North District, Technology Park',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
