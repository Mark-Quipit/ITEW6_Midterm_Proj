<?php

namespace Modules\Instructional;

use App\Models\InstructionalMaterial;

class InstructionalRepository
{
    public function getFiltered(array $filters, int $perPage = 15)
    {
        $query = InstructionalMaterial::with(['subject', 'faculty']);

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                  ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['subject_id'])) {
            $query->where('subject_id', $filters['subject_id']);
        }

        if (!empty($filters['faculty_id'])) {
            $query->where('faculty_id', $filters['faculty_id']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getBySubject(int $subjectId)
    {
        return InstructionalMaterial::with(['faculty'])
            ->where('subject_id', $subjectId)
            ->orderBy('type')
            ->orderBy('title')
            ->get();
    }
}
