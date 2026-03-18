<?php

namespace Modules\Events;

class EventService
{
    protected EventRepository $repository;

    public function __construct(EventRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getEvents(array $filters, int $perPage = 15)
    {
        return $this->repository->getFiltered($filters, $perPage);
    }
}
