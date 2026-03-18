<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('department')->insert([
            [
                'department_code' => 'CS',
                'department_name' => 'Computer Science',
                'campus_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_code' => 'IT',
                'department_name' => 'Information Technology',
                'campus_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_code' => 'ACT',
                'department_name' => 'Associate in Computer Technology',
                'campus_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
