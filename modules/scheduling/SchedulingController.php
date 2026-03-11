<?php

namespace Modules\Scheduling;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchedulingController extends Controller
{
    protected SchedulingService $service;

    public function __construct(SchedulingService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'faculty_id', 'section', 'day']);
        $schedules = $this->service->getSchedules($filters, 15);

        return Inertia::render('scheduling/SchedulingIndex', [
            'schedules' => $schedules,
            'filters' => $filters,
            'faculty' => $this->service->getAllFaculty(),
        ]);
    }

    public function byFaculty($facultyId)
    {
        $schedules = $this->service->getSchedulesByFaculty($facultyId);
        $faculty = $this->service->getFacultyById($facultyId);

        return Inertia::render('scheduling/FacultySchedule', [
            'schedules' => $schedules,
            'faculty' => $faculty,
        ]);
    }

    public function bySection($section)
    {
        $schedules = $this->service->getSchedulesBySection($section);

        return Inertia::render('scheduling/SectionSchedule', [
            'schedules' => $schedules,
            'section' => $section,
        ]);
    }
}
