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
            $query->where('program', $filters['program']);
        }

        if (!empty($filters['year_level'])) {
            $query->where('year_level', $filters['year_level']);
        }

        return $query->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Student::findOrFail($id);
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
