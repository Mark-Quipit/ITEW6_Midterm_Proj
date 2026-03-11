<?php

namespace Modules\Scheduling;

use App\Models\Faculty;

class SchedulingService
{
    protected SchedulingRepository $repository;

    public function __construct(SchedulingRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getSchedules(array $filters, int $perPage = 15)
    {
        return $this->repository->getFiltered($filters, $perPage);
    }

    public function getSchedulesByFaculty(int $facultyId)
    {
        return $this->repository->getByFaculty($facultyId);
    }

    public function getSchedulesBySection(string $section)
    {
        return $this->repository->getBySection($section);
    }

    public function getAllFaculty()
    {
        return Faculty::select('id', 'first_name', 'last_name', 'faculty_id')
            ->orderBy('last_name')
            ->get();
    }

    public function getFacultyById(int $id)
    {
        return Faculty::findOrFail($id);
    }
}
