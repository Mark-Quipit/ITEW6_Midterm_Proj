<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InstructionalMaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            [1, 1, 'Introduction to Programming Syllabus', 'syllabus', 'Course syllabus for CS101', '2024-2025', '1st Semester'],
            [1, 1, 'Week 1-4 Lesson Plans', 'lesson_plan', 'Detailed lesson plans for the first month', '2024-2025', '1st Semester'],
            [1, 1, 'Programming Fundamentals Module', 'module', 'Self-paced learning module covering basic programming concepts', '2024-2025', '1st Semester'],
            
            [2, 2, 'Data Structures Course Syllabus', 'syllabus', 'Complete course outline and requirements', '2024-2025', '1st Semester'],
            [2, 2, 'Arrays and Linked Lists Presentation', 'presentation', 'PowerPoint presentation on linear data structures', '2024-2025', '1st Semester'],
            [2, 2, 'Midterm Exam', 'assessment', 'Comprehensive midterm examination', '2024-2025', '1st Semester'],
            
            [3, 3, 'OOP Principles Syllabus', 'syllabus', 'Object-Oriented Programming course guide', '2024-2025', '1st Semester'],
            [3, 3, 'Inheritance and Polymorphism Module', 'module', 'Advanced OOP concepts module', '2024-2025', '1st Semester'],
            
            [4, 4, 'Database Design Syllabus', 'syllabus', 'DBMS course syllabus and schedule', '2024-2025', '1st Semester'],
            [4, 4, 'SQL Fundamentals Presentation', 'presentation', 'Introduction to SQL queries', '2024-2025', '1st Semester'],
            [4, 4, 'Database Normalization Module', 'module', 'Comprehensive guide to database normalization', '2024-2025', '1st Semester'],
            
            [5, 5, 'Software Engineering Syllabus', 'syllabus', 'SE methodologies and practices', '2024-2025', '1st Semester'],
            [5, 5, 'SDLC Lesson Plans', 'lesson_plan', 'Software Development Life Cycle lessons', '2024-2025', '1st Semester'],
            
            [6, 6, 'Web Development Syllabus', 'syllabus', 'Modern web technologies course outline', '2024-2025', '1st Semester'],
            [6, 6, 'HTML/CSS/JavaScript Module', 'module', 'Frontend development fundamentals', '2024-2025', '1st Semester'],
            [6, 6, 'Final Project Guidelines', 'assessment', 'Web application project requirements', '2024-2025', '1st Semester'],
        ];

        foreach ($materials as $material) {
            DB::table('instructional_material')->insert([
                'subject_id' => $material[0],
                'faculty_id' => $material[1],
                'title' => $material[2],
                'type' => $material[3],
                'description' => $material[4],
                'school_year' => $material[5],
                'semester' => $material[6],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
