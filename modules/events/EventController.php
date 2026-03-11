<?php

namespace Modules\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    protected EventService $service;

    public function __construct(EventService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'event_type']);
        $events = $this->service->getEvents($filters, 15);

        return Inertia::render('events/EventIndex', [
            'events' => $events,
            'filters' => $filters
        ]);
    }
}
