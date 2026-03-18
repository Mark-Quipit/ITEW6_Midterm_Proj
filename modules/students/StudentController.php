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
        $filters = $request->only(['search', 'program', 'year_level', 'status', 'gender']);
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

    public function create()
    {
        return Inertia::render('students/StudentCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string|unique:student,student_id',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:student,email',
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:Male,Female,Other',
            'program' => 'required|string|max:255',
            'year_level' => 'required|integer|min:1|max:4',
            'section' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive,graduated,suspended'
        ]);

        $this->service->createStudent($validated);

        return redirect()->route('students.index')
            ->with('success', 'Student created successfully.');
    }

    public function edit($id)
    {
        $student = $this->service->getStudentById($id);

        return Inertia::render('students/StudentEdit', [
            'student' => $student
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'student_id' => 'required|string|unique:student,student_id,' . $id,
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:student,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:Male,Female,Other',
            'program' => 'required|string|max:255',
            'year_level' => 'required|integer|min:1|max:4',
            'section' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive,graduated,suspended'
        ]);

        $this->service->updateStudent($id, $validated);

        return redirect()->route('students.index')
            ->with('success', 'Student updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteStudent($id);

        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}
