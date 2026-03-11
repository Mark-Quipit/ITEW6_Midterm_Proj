<?php

namespace Modules\Research;

class ResearchService
{
    protected ResearchRepository $repository;

    public function __construct(ResearchRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getResearch(array $filters, int $perPage = 15)
    {
        return $this->repository->getFiltered($filters, $perPage);
    }
}
