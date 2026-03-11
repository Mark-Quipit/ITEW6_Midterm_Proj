<?php

namespace Modules\Research;

use App\Models\Research;

class ResearchRepository
{
    public function getFiltered(array $filters, int $perPage = 15)
    {
        $query = Research::query();

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                  ->orWhere('authors', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['program'])) {
            $query->where('program', $filters['program']);
        }

        if (!empty($filters['year'])) {
            $query->where('year_published', $filters['year']);
        }

        return $query->orderBy('year_published', 'desc')->paginate($perPage);
    }
}
