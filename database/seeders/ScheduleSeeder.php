<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $schedules = [
            // Monday
            [1, 1, '2024-2025', '1st Semester', 'A', 'Monday', '08:00:00', '09:30:00', 'Room 301'],
            [2, 2, '2024-2025', '1st Semester', 'A', 'Monday', '09:30:00', '11:00:00', 'Room 302'],
            [3, 3, '2024-2025', '1st Semester', 'B', 'Monday', '13:00:00', '14:30:00', 'Room 303'],
            
            // Tuesday
            [4, 4, '2024-2025', '1st Semester', 'A', 'Tuesday', '08:00:00', '09:30:00', 'Room 301'],
            [5, 5, '2024-2025', '1st Semester', 'B', 'Tuesday', '09:30:00', '11:00:00', 'Room 302'],
            [6, 6, '2024-2025', '1st Semester', 'A', 'Tuesday', '13:00:00', '14:30:00', 'Room 303'],
            
            // Wednesday
            [7, 1, '2024-2025', '1st Semester', 'B', 'Wednesday', '08:00:00', '09:30:00', 'Room 301'],
            [8, 2, '2024-2025', '1st Semester', 'A', 'Wednesday', '09:30:00', '11:00:00', 'Room 302'],
            [9, 3, '2024-2025', '1st Semester', 'A', 'Wednesday', '13:00:00', '14:30:00', 'Room 303'],
            
            // Thursday
            [10, 4, '2024-2025', '1st Semester', 'B', 'Thursday', '08:00:00', '09:30:00', 'Room 301'],
            [1, 5, '2024-2025', '1st Semester', 'A', 'Thursday', '09:30:00', '11:00:00', 'Room 302'],
            [2, 6, '2024-2025', '1st Semester', 'B', 'Thursday', '13:00:00', '14:30:00', 'Room 303'],
            
            // Friday
            [3, 1, '2024-2025', '1st Semester', 'A', 'Friday', '08:00:00', '09:30:00', 'Room 301'],
            [4, 2, '2024-2025', '1st Semester', 'B', 'Friday', '09:30:00', '11:00:00', 'Room 302'],
            [5, 3, '2024-2025', '1st Semester', 'A', 'Friday', '13:00:00', '14:30:00', 'Room 303'],
        ];

        foreach ($schedules as $schedule) {
            DB::table('schedule')->insert([
                'subject_id' => $schedule[0],
                'faculty_id' => $schedule[1],
                'school_year' => $schedule[2],
                'semester' => $schedule[3],
                'section' => $schedule[4],
                'day_of_week' => $schedule[5],
                'start_time' => $schedule[6],
                'end_time' => $schedule[7],
                'room' => $schedule[8],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
