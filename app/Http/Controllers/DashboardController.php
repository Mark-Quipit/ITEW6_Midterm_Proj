<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Faculty;
use App\Models\Event;
use App\Models\Research;
use App\Models\Schedule;
use App\Models\InstructionalMaterial;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get counts
        $stats = [
            'students' => Student::count(),
            'faculty' => Faculty::count(),
            'events' => Event::where('status', 'upcoming')->count(),
            'research' => Research::whereYear('created_at', date('Y'))->count(),
            'schedules' => Schedule::count(),
            'materials' => InstructionalMaterial::count(),
        ];

        // Students by program
        $studentsByProgram = Student::select('program', DB::raw('count(*) as count'))
            ->groupBy('program')
            ->get();

        // Students by year level
        $studentsByYear = Student::select('year_level', DB::raw('count(*) as count'))
            ->groupBy('year_level')
            ->orderBy('year_level')
            ->get();

        // Recent events
        $recentEvents = Event::orderBy('event_date', 'desc')
            ->limit(5)
            ->get();

        // Upcoming events
        $upcomingEvents = Event::where('status', 'upcoming')
            ->where('event_date', '>=', now())
            ->orderBy('event_date', 'asc')
            ->limit(5)
            ->get();

        // Recent research
        $recentResearch = Research::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Faculty by department
        $facultyByDepartment = Faculty::select('department_id', DB::raw('count(*) as count'))
            ->with('department:id,department_name')
            ->groupBy('department_id')
            ->get();

        // Today's schedule
        $todaySchedule = Schedule::with(['subject', 'faculty'])
            ->where('day_of_week', now()->format('l'))
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'studentsByProgram' => $studentsByProgram,
            'studentsByYear' => $studentsByYear,
            'recentEvents' => $recentEvents,
            'upcomingEvents' => $upcomingEvents,
            'recentResearch' => $recentResearch,
            'facultyByDepartment' => $facultyByDepartment,
            'todaySchedule' => $todaySchedule,
        ]);
    }
}
