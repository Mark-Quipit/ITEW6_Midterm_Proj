import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Research, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  research: PaginatedData<Research>;
  filters: { search: string; program: string; year: string; category: string; };
}

function parseMulti(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').filter(Boolean);
}

export default function ResearchIndex({ research, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [program, setProgram] = useState(filters.program || '');
  const [year, setYear] = useState(filters.year || '');
  const [category, setCategory] = useState<string[]>(parseMulti(filters.category));

  const applyFilters = () => {
    router.get('/research', {
      search,
      program,
      year,
      category: category.join(','),
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setSearch('');
    setProgram('');
    setYear('');
    setCategory([]);
    router.get('/research', {}, { preserveState: true });
  };

  const columns = [
    {
      key: 'title',
      label: 'Research Title',
      render: (r: Research) => (
        <div>
          <div className="font-medium text-gray-900">{r.title}</div>
          <div className="text-xs text-gray-500">{r.authors || '—'}</div>
        </div>
      ),
    },
    {
      key: 'program',
      label: 'Program',
      render: (r: Research) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
          {r.program || '—'}
        </span>
      ),
    },
    {
      key: 'year_published',
      label: 'Year',
      render: (r: Research) => (
        <span className="text-sm text-gray-700">{r.year_published || '—'}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (r: Research) => (
        <span className="text-sm text-gray-700">{r.category || '—'}</span>
      ),
    },
    {
      key: 'evaluation_score',
      label: 'Score',
      render: (r: Research) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          {r.evaluation_score || '—'}
        </span>
      ),
    },
  ];

  const activeFiltersCount = [program, year].filter(Boolean).length + category.length;

  const appliedChips: { label: string }[] = [
    ...(filters.search ? [{ label: `"${filters.search}"` }] : []),
    ...(filters.program ? [{ label: `Program: ${filters.program}` }] : []),
    ...(filters.year ? [{ label: `Year: ${filters.year}` }] : []),
    ...parseMulti(filters.category).map(c => ({ label: `Category: ${c}` })),
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 bg-orange-100 rounded-lg">
                <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Research Repository
            </h1>
            <p className="mt-1 text-sm text-gray-500 ml-11">Browse and manage research publications</p>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-xs text-gray-500 font-medium">Total Research</div>
            <div className="text-xl font-bold text-orange-600">{research.total}</div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          onApply={applyFilters}
          onReset={resetFilters}
          activeCount={activeFiltersCount}
          searchPlaceholder="Search by title or authors..."
          filters={[
            {
              name: 'program',
              label: 'Program',
              value: program,
              options: [
                { label: 'BSCS', value: 'BSCS' },
                { label: 'BSIT', value: 'BSIT' },
                { label: 'ACT', value: 'ACT' },
              ],
              onChange: setProgram,
            },
            {
              name: 'year',
              label: 'Year Published',
              value: year,
              options: [
                { label: '2024', value: '2024' },
                { label: '2023', value: '2023' },
                { label: '2022', value: '2022' },
                { label: '2021', value: '2021' },
              ],
              onChange: setYear,
            },
            {
              name: 'category',
              label: 'Category',
              type: 'multiselect' as const,
              value: category,
              options: [
                { label: 'Thesis', value: 'thesis' },
                { label: 'Capstone', value: 'capstone' },
                { label: 'Journal', value: 'journal' },
                { label: 'Conference', value: 'conference' },
              ],
              onChange: (v: string[]) => setCategory(v),
            },
          ]}
        />

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                {research.total} {research.total === 1 ? 'research' : 'research papers'} found
              </span>
              {appliedChips.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {appliedChips.map((chip, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                      {chip.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {appliedChips.length > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap"
              >
                Clear all filters
              </button>
            )}
          </div>

          <DataTable columns={columns} data={research.data} />

          <Pagination
            currentPage={research.current_page}
            lastPage={research.last_page}
            total={research.total}
            perPage={research.per_page}
          />
        </div>
      </div>
    </AppLayout>
  );
}
