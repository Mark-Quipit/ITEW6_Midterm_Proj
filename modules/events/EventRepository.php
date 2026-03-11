<?php

namespace Modules\Events;

use App\Models\Event;

class EventRepository
{
    public function getFiltered(array $filters, int $perPage = 15)
    {
        $query = Event::query();

        if (!empty($filters['search'])) {
            $query->where('event_name', 'like', "%{$filters['search']}%");
        }

        if (!empty($filters['event_type'])) {
            $query->where('event_type', $filters['event_type']);
        }

        return $query->orderBy('event_date', 'desc')->paginate($perPage);
    }
}
