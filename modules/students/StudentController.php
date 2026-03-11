<?php

namespace Modules\Students;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    protected StudentService $service;

    public function __construct(StudentService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'program', 'year_level']);
        $students = $this->service->getStudents($filters, 15);

        return Inertia::render('students/StudentIndex', [
            'students' => $students,
            'filters' => $filters
        ]);
    }

    public function show($id)
    {
        $data = $this->service->getStudentProfile($id);

        return Inertia::render('students/StudentProfile', $data);
    }
}
