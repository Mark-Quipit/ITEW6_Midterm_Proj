<?php

namespace Modules\Scheduling;

use App\Models\Schedule;

class SchedulingRepository
{
    public function getFiltered(array $filters, int $perPage = 15)
    {
        $query = Schedule::with(['subject', 'faculty']);

        if (!empty($filters['search'])) {
            $query->whereHas('subject', function($q) use ($filters) {
                $q->where('subject_name', 'like', "%{$filters['search']}%")
                  ->orWhere('subject_code', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['faculty_id'])) {
            $query->where('faculty_id', $filters['faculty_id']);
        }

        if (!empty($filters['section'])) {
            $query->where('section', $filters['section']);
        }

        if (!empty($filters['day'])) {
            $query->where('day_of_week', $filters['day']);
        }

        return $query->orderBy('day_of_week')
            ->orderBy('start_time')
            ->paginate($perPage);
    }

    public function getByFaculty(int $facultyId)
    {
        return Schedule::with(['subject'])
            ->where('faculty_id', $facultyId)
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();
    }

    public function getBySection(string $section)
    {
        return Schedule::with(['subject', 'faculty'])
            ->where('section', $section)
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();
    }
}
