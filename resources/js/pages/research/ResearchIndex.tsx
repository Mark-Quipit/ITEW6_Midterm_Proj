import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Research, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  research: PaginatedData<Research>;
  filters: { search: string; program: string; year: string; };
}

export default function ResearchIndex({ research, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [program, setProgram] = useState(filters.program || '');
  const [year, setYear] = useState(filters.year || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/research', { search: value, program, year }, { preserveState: true });
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'program', label: 'Program' },
    { key: 'year_published', label: 'Year' },
    { key: 'category', label: 'Category' },
    { key: 'evaluation_score', label: 'Score' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Research Repository</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={[
                {
                  name: 'program',
                  label: 'Program',
                  value: program,
                  options: [
                    { label: 'BSCS', value: 'BSCS' },
                    { label: 'BSIT', value: 'BSIT' },
                  ],
                  onChange: (value) => {
                    setProgram(value);
                    router.get('/research', { search, program: value, year }, { preserveState: true });
                  },
                },
                {
                  name: 'year',
                  label: 'Year',
                  value: year,
                  options: [
                    { label: '2024', value: '2024' },
                    { label: '2023', value: '2023' },
                    { label: '2022', value: '2022' },
                  ],
                  onChange: (value) => {
                    setYear(value);
                    router.get('/research', { search, program, year: value }, { preserveState: true });
                  },
                },
              ]}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search research..." />
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <DataTable columns={columns} data={research.data} />
              <Pagination
                currentPage={research.current_page}
                lastPage={research.last_page}
                total={research.total}
                perPage={research.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
