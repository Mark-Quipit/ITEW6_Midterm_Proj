<?php

namespace Modules\Instructional;

use App\Models\Subject;
use App\Models\Faculty;

class InstructionalService
{
    protected InstructionalRepository $repository;

    public function __construct(InstructionalRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getMaterials(array $filters, int $perPage = 15)
    {
        return $this->repository->getFiltered($filters, $perPage);
    }

    public function getMaterialsBySubject(int $subjectId)
    {
        return $this->repository->getBySubject($subjectId);
    }

    public function getAllSubjects()
    {
        return Subject::select('id', 'subject_code', 'subject_name')
            ->orderBy('subject_code')
            ->get();
    }

    public function getAllFaculty()
    {
        return Faculty::select('id', 'first_name', 'last_name', 'faculty_id')
            ->orderBy('last_name')
            ->get();
    }

    public function getSubjectById(int $id)
    {
        return Subject::findOrFail($id);
    }
}
