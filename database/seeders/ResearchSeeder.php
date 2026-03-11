<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResearchSeeder extends Seeder
{
    public function run(): void
    {
        $research = [
            [
                'Machine Learning Applications in Healthcare Diagnostics',
                'Dr. Roberto Cruz, Juan Dela Cruz',
                'BSCS',
                2024,
                'Artificial Intelligence',
                95.5,
                'This research explores the application of machine learning algorithms in improving healthcare diagnostic accuracy.'
            ],
            [
                'Blockchain Technology for Secure Academic Records Management',
                'Prof. Elena Reyes, Maria Santos, Pedro Reyes',
                'BSCS',
                2024,
                'Blockchain',
                92.0,
                'A study on implementing blockchain technology to ensure the security and integrity of academic records.'
            ],
            [
                'IoT-Based Smart Campus Management System',
                'Dr. Manuel Torres, Ana Cruz',
                'BSIT',
                2023,
                'Internet of Things',
                88.5,
                'Development of an IoT-based system for efficient campus resource management and monitoring.'
            ],
            [
                'Natural Language Processing for Filipino Language Translation',
                'Prof. Carmen Santos, Jose Torres',
                'BSCS',
                2023,
                'Natural Language Processing',
                90.0,
                'Research on developing NLP models specifically designed for Filipino language translation and processing.'
            ],
            [
                'Cybersecurity Framework for Educational Institutions',
                'Dr. Ricardo Gomez, Sofia Ramos',
                'BSIT',
                2024,
                'Cybersecurity',
                93.5,
                'A comprehensive cybersecurity framework tailored for educational institutions in the Philippines.'
            ],
            [
                'Mobile Application Development Using Progressive Web Apps',
                'Prof. Teresa Ramos, Miguel Fernandez',
                'BSIT',
                2023,
                'Mobile Development',
                87.0,
                'Comparative study of Progressive Web Apps versus native mobile applications.'
            ],
            [
                'Data Analytics for Student Performance Prediction',
                'Dr. Roberto Cruz, Isabella Gonzales',
                'BSCS',
                2024,
                'Data Science',
                91.5,
                'Using data analytics and predictive modeling to identify at-risk students and improve retention rates.'
            ],
            [
                'Cloud Computing Solutions for Small and Medium Enterprises',
                'Prof. Elena Reyes, Carlos Mendoza',
                'BSIT',
                2023,
                'Cloud Computing',
                89.0,
                'Analysis of cloud computing adoption challenges and solutions for SMEs in the Philippines.'
            ],
        ];

        foreach ($research as $r) {
            DB::table('research')->insert([
                'title' => $r[0],
                'authors' => $r[1],
                'program' => $r[2],
                'year_published' => $r[3],
                'category' => $r[4],
                'evaluation_score' => $r[5],
                'abstract' => $r[6],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
