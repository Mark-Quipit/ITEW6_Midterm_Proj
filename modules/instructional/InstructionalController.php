<?php

namespace Modules\Instructional;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstructionalController extends Controller
{
    protected InstructionalService $service;

    public function __construct(InstructionalService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'type', 'subject_id', 'faculty_id']);
        $materials = $this->service->getMaterials($filters, 15);

        return Inertia::render('instructional/InstructionalIndex', [
            'materials' => $materials,
            'filters' => $filters,
            'subjects' => $this->service->getAllSubjects(),
            'faculty' => $this->service->getAllFaculty(),
        ]);
    }

    public function bySubject($subjectId)
    {
        $materials = $this->service->getMaterialsBySubject($subjectId);
        $subject = $this->service->getSubjectById($subjectId);

        return Inertia::render('instructional/SubjectMaterials', [
            'materials' => $materials,
            'subject' => $subject,
        ]);
    }
}
