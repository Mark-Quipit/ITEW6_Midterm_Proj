<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Students\StudentRepository;
use Modules\Students\StudentService;
use Modules\Faculty\FacultyRepository;
use Modules\Faculty\FacultyService;
use Modules\Events\EventRepository;
use Modules\Events\EventService;
use Modules\Research\ResearchRepository;
use Modules\Research\ResearchService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register custom Neon PostgreSQL connector
        $this->app->bind('db.connector.pgsql', function () {
            return new \App\Database\NeonPostgresConnector();
        });

        // Student Module
        $this->app->singleton(StudentRepository::class);
        $this->app->singleton(StudentService::class);

        // Faculty Module
        $this->app->singleton(FacultyRepository::class);
        $this->app->singleton(FacultyService::class);

        // Events Module
        $this->app->singleton(EventRepository::class);
        $this->app->singleton(EventService::class);

        // Research Module
        $this->app->singleton(ResearchRepository::class);
        $this->app->singleton(ResearchService::class);

        // Scheduling Module
        $this->app->singleton(\Modules\Scheduling\SchedulingRepository::class);
        $this->app->singleton(\Modules\Scheduling\SchedulingService::class);

        // Instructional Module
        $this->app->singleton(\Modules\Instructional\InstructionalRepository::class);
        $this->app->singleton(\Modules\Instructional\InstructionalService::class);
    }

    public function boot(): void
    {
        //
    }
}
