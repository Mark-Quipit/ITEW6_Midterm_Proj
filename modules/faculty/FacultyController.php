<?php

namespace Modules\Faculty;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyController extends Controller
{
    protected FacultyService $service;

    public function __construct(FacultyService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'department']);
        $faculty = $this->service->getFaculty($filters, 15);

        return Inertia::render('faculty/FacultyIndex', [
            'faculty' => $faculty,
            'filters' => $filters
        ]);
    }

    public function show($id)
    {
        $data = $this->service->getFacultyProfile($id);

        return Inertia::render('faculty/FacultyProfile', $data);
    }
}
