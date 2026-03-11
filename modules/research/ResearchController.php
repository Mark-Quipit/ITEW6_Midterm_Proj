<?php

namespace Modules\Research;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResearchController extends Controller
{
    protected ResearchService $service;

    public function __construct(ResearchService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'program', 'year']);
        $research = $this->service->getResearch($filters, 15);

        return Inertia::render('research/ResearchIndex', [
            'research' => $research,
            'filters' => $filters
        ]);
    }
}
