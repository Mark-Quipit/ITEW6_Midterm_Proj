<?php

namespace Modules\Faculty;

class FacultyService
{
    protected FacultyRepository $repository;

    public function __construct(FacultyRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getFaculty(array $filters, int $perPage = 15)
    {
        return $this->repository->getFiltered($filters, $perPage);
    }

    public function getFacultyProfile(int $id)
    {
        return [
            'faculty' => $this->repository->findById($id),
            'trainings' => $this->repository->getTrainings($id),
        ];
    }
}
