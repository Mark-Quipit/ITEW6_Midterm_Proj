<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $faculty = [
            ['FAC-001', 'Dr. Roberto', 'Santos', 'Cruz', 'roberto.cruz@faculty.edu', '09171111111', 1, 'Artificial Intelligence', 'Full-time'],
            ['FAC-002', 'Prof. Elena', 'Garcia', 'Reyes', 'elena.reyes@faculty.edu', '09172222222', 1, 'Software Engineering', 'Full-time'],
            ['FAC-003', 'Dr. Manuel', 'Lopez', 'Torres', 'manuel.torres@faculty.edu', '09173333333', 1, 'Data Science', 'Full-time'],
            ['FAC-004', 'Prof. Carmen', 'Dela', 'Santos', 'carmen.santos@faculty.edu', '09174444444', 2, 'Network Security', 'Full-time'],
            ['FAC-005', 'Dr. Ricardo', 'Fernandez', 'Gomez', 'ricardo.gomez@faculty.edu', '09175555555', 2, 'Database Systems', 'Full-time'],
            ['FAC-006', 'Prof. Teresa', 'Martinez', 'Ramos', 'teresa.ramos@faculty.edu', '09176666666', 2, 'Web Technologies', 'Part-time'],
        ];

        foreach ($faculty as $index => $fac) {
            $facultyId = DB::table('faculty')->insertGetId([
                'faculty_id' => $fac[0],
                'first_name' => $fac[1],
                'middle_name' => $fac[2],
                'last_name' => $fac[3],
                'email' => $fac[4],
                'phone' => $fac[5],
                'department_id' => $fac[6],
                'specialization' => $fac[7],
                'employment_status' => $fac[8],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add training
            DB::table('faculty_training')->insert([
                'faculty_id' => $facultyId,
                'training_name' => 'Advanced Teaching Methodologies',
                'provider' => 'National Education Institute',
                'date_completed' => now()->subMonths(rand(6, 24)),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Assign subjects
            $subjectId = ($index % 10) + 1;
            DB::table('faculty_subject_assignment')->insert([
                'faculty_id' => $facultyId,
                'subject_id' => $subjectId,
                'school_year' => '2024-2025',
                'semester' => '1st Semester',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
