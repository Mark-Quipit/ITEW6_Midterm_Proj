<?php

namespace Modules\Students;

class StudentService
{
    protected StudentRepository $repository;

    public function __construct(StudentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getStudents(array $filters, int $perPage = 15)
    {
        return $this->repository->getFiltered($filters, $perPage);
    }

    public function getStudentProfile(int $id)
    {
        return [
            'student' => $this->repository->findById($id),
            'academicRecords' => $this->repository->getAcademicRecords($id),
            'awards' => $this->repository->getAwards($id),
            'violations' => $this->repository->getViolations($id),
        ];
    }
}
