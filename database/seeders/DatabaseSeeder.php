<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CampusSeeder::class,
            DepartmentSeeder::class,
            SubjectSeeder::class,
            StudentSeeder::class,
            FacultySeeder::class,
            EventSeeder::class,
            ResearchSeeder::class,
            ScheduleSeeder::class,
            InstructionalMaterialSeeder::class,
        ]);
    }
}
