<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            ['CS101', 'Introduction to Programming', 3, 1],
            ['CS102', 'Data Structures and Algorithms', 3, 1],
            ['CS201', 'Object-Oriented Programming', 3, 1],
            ['CS202', 'Database Management Systems', 3, 1],
            ['CS301', 'Software Engineering', 3, 1],
            ['CS302', 'Web Development', 3, 1],
            ['IT101', 'Fundamentals of IT', 3, 2],
            ['IT102', 'Network Administration', 3, 2],
            ['IT201', 'System Analysis and Design', 3, 2],
            ['IT202', 'IT Project Management', 3, 2],
        ];

        foreach ($subjects as $subject) {
            DB::table('subject')->insert([
                'subject_code' => $subject[0],
                'subject_name' => $subject[1],
                'units' => $subject[2],
                'department_id' => $subject[3],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
