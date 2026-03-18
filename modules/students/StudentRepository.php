<?php

namespace Modules\Students;

use App\Models\Student;
use App\Models\AcademicRecord;
use App\Models\AcademicAward;
use App\Models\Violation;

class StudentRepository
{
    public function getFiltered(array $filters, int $perPage = 15)
    {
        $query = Student::query();

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('student_id', 'like', "%{$filters['search']}%")
                  ->orWhere('first_name', 'like', "%{$filters['search']}%")
                  ->orWhere('last_name', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['program'])) {
            $programs = is_array($filters['program']) ? $filters['program'] : explode(',', $filters['program']);
            $query->whereIn('program', array_filter($programs));
        }

        if (!empty($filters['year_level'])) {
            $levels = is_array($filters['year_level']) ? $filters['year_level'] : explode(',', $filters['year_level']);
            $query->whereIn('year_level', array_filter($levels));
        }

        if (!empty($filters['status'])) {
            $statuses = is_array($filters['status']) ? $filters['status'] : explode(',', $filters['status']);
            $query->whereIn('status', array_filter($statuses));
        }

        if (!empty($filters['gender'])) {
            $genders = is_array($filters['gender']) ? $filters['gender'] : explode(',', $filters['gender']);
            $query->whereIn('gender', array_filter($genders));
        }

        return $query->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Student::findOrFail($id);
    }

    public function create(array $data)
    {
        return Student::create($data);
    }

    public function update(int $id, array $data)
    {
        $student = Student::findOrFail($id);
        $student->update($data);
        return $student;
    }

    public function delete(int $id)
    {
        $student = Student::findOrFail($id);
        return $student->delete();
    }

    public function getAcademicRecords(int $studentId)
    {
        return AcademicRecord::where('student_id', $studentId)->get();
    }

    public function getAwards(int $studentId)
    {
        return AcademicAward::where('student_id', $studentId)->get();
    }

    public function getViolations(int $studentId)
    {
        return Violation::where('student_id', $studentId)->get();
    }
}
