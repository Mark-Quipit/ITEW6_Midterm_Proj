<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            ['Tech Summit 2024', 'conference', 'Annual technology conference featuring industry leaders', now()->addDays(30), 'Main Auditorium', 1, 'upcoming'],
            ['Programming Competition', 'competition', 'Inter-college programming challenge', now()->addDays(15), 'Computer Laboratory', 2, 'upcoming'],
            ['Web Development Workshop', 'workshop', 'Hands-on workshop on modern web technologies', now()->addDays(7), 'Room 301', 3, 'upcoming'],
            ['AI and Machine Learning Seminar', 'seminar', 'Introduction to AI and ML concepts', now()->addDays(45), 'Conference Hall', 1, 'upcoming'],
            ['Cybersecurity Awareness Week', 'seminar', 'Week-long cybersecurity awareness program', now()->addDays(60), 'Various Venues', 4, 'upcoming'],
            ['Alumni Homecoming', 'social', 'Annual gathering of CCS alumni', now()->addDays(90), 'University Grounds', 2, 'upcoming'],
            ['Research Symposium', 'conference', 'Presentation of student and faculty research', now()->subDays(30), 'Main Auditorium', 1, 'completed'],
            ['Hackathon 2024', 'competition', '24-hour coding challenge', now()->subDays(15), 'Innovation Hub', 3, 'completed'],
        ];

        foreach ($events as $event) {
            DB::table('event')->insert([
                'event_name' => $event[0],
                'event_type' => $event[1],
                'description' => $event[2],
                'event_date' => $event[3],
                'venue' => $event[4],
                'assigned_faculty_id' => $event[5],
                'status' => $event[6],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
