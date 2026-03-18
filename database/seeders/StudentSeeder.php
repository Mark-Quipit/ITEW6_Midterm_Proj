<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            ['2021-00001', 'Juan', 'Santos', 'Dela Cruz', 'juan.delacruz@student.edu', '09171234567', '2003-05-15', 'Male', 'BSCS', 3, 'A', 'active'],
            ['2021-00002', 'Maria', 'Garcia', 'Santos', 'maria.santos@student.edu', '09181234567', '2003-08-20', 'Female', 'BSCS', 3, 'A', 'active'],
            ['2021-00003', 'Pedro', 'Lopez', 'Reyes', 'pedro.reyes@student.edu', '09191234567', '2003-03-10', 'Male', 'BSIT', 3, 'B', 'active'],
            ['2022-00001', 'Ana', 'Marie', 'Cruz', 'ana.cruz@student.edu', '09201234567', '2004-01-25', 'Female', 'BSCS', 2, 'A', 'active'],
            ['2022-00002', 'Jose', 'Miguel', 'Torres', 'jose.torres@student.edu', '09211234567', '2004-06-30', 'Male', 'BSIT', 2, 'B', 'active'],
            ['2022-00003', 'Sofia', 'Isabel', 'Ramos', 'sofia.ramos@student.edu', '09221234567', '2004-09-12', 'Female', 'BSCS', 2, 'A', 'active'],
            ['2023-00001', 'Miguel', 'Angelo', 'Fernandez', 'miguel.fernandez@student.edu', '09231234567', '2005-02-18', 'Male', 'BSIT', 1, 'A', 'active'],
            ['2023-00002', 'Isabella', 'Rose', 'Gonzales', 'isabella.gonzales@student.edu', '09241234567', '2005-07-22', 'Female', 'BSCS', 1, 'B', 'active'],
            ['2023-00003', 'Carlos', 'Antonio', 'Mendoza', 'carlos.mendoza@student.edu', '09251234567', '2005-11-05', 'Male', 'ACT', 1, 'A', 'active'],
            ['2023-00004', 'Gabriela', 'Marie', 'Villanueva', 'gabriela.villanueva@student.edu', '09261234567', '2005-04-14', 'Female', 'BSIT', 1, 'A', 'active'],
        ];

        foreach ($students as $index => $student) {
            $studentId = DB::table('student')->insertGetId([
                'student_id' => $student[0],
                'first_name' => $student[1],
                'middle_name' => $student[2],
                'last_name' => $student[3],
                'email' => $student[4],
                'phone' => $student[5],
                'birth_date' => $student[6],
                'gender' => $student[7],
                'program' => $student[8],
                'year_level' => $student[9],
                'section' => $student[10],
                'status' => $student[11],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add address
            DB::table('student_address')->insert([
                'student_id' => $studentId,
                'address_type' => 'permanent',
                'street' => ($index + 1) . ' Main Street',
                'barangay' => 'Barangay ' . ($index + 1),
                'city' => 'Metro Manila',
                'province' => 'NCR',
                'postal_code' => '1000',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add academic records
            if ($student[9] >= 2) {
                DB::table('academic_record')->insert([
                    'student_id' => $studentId,
                    'school_year' => '2023-2024',
                    'semester' => '1st Semester',
                    'gpa' => rand(150, 400) / 100,
                    'units_earned' => rand(15, 21),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Add some awards for top students
            if ($index < 3) {
                DB::table('academic_award')->insert([
                    'student_id' => $studentId,
                    'award_name' => ['Dean\'s Lister', 'President\'s Lister', 'Academic Excellence Award'][$index],
                    'date_received' => now()->subMonths(rand(1, 12)),
                    'description' => 'Outstanding academic performance',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
