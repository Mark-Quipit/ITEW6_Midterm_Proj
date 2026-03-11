<?php

namespace Modules\Faculty;

use App\Models\Faculty;
use App\Models\FacultyTraining;

class FacultyRepository
{
    public function getFiltered(array $filters, int $perPage = 15)
    {
        $query = Faculty::query();

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('faculty_id', 'like', "%{$filters['search']}%")
                  ->orWhere('first_name', 'like', "%{$filters['search']}%")
                  ->orWhere('last_name', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['department'])) {
            $query->whereHas('department', function($q) use ($filters) {
                $q->where('department_code', $filters['department']);
            });
        }

        return $query->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Faculty::findOrFail($id);
    }

    public function getTrainings(int $facultyId)
    {
        return FacultyTraining::where('faculty_id', $facultyId)->get();
    }
}
