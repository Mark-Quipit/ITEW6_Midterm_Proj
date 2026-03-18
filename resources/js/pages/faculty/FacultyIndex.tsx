import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Faculty, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  faculty: PaginatedData<Faculty>;
  filters: { search: string; department: string; employment_status: string; };
}

function parseMulti(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').filter(Boolean);
}

export default function FacultyIndex({ faculty, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [department, setDepartment] = useState(filters.department || '');
  const [employmentStatus, setEmploymentStatus] = useState<string[]>(parseMulti(filters.employment_status));

  const applyFilters = () => {
    router.get('/faculty', {
      search,
      department,
      employment_status: employmentStatus.join(','),
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setSearch('');
    setDepartment('');
    setEmploymentStatus([]);
    router.get('/faculty', {}, { preserveState: true });
  };

  const handleView = (f: Faculty) => router.visit(`/faculty/${f.id}`);

  const getStatusBadge = (status: string | undefined) => {
    const cfg: Record<string, { bg: string; text: string }> = {
      'full-time': { bg: 'bg-green-100', text: 'text-green-800' },
      'part-time': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'contractual': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    };
    const c = cfg[status?.toLowerCase() || 'full-time'] || cfg['full-time'];
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        {status || 'Full-time'}
      </span>
    );
  };

  const columns = [
    {
      key: 'faculty_id',
      label: 'Faculty ID',
      render: (f: Faculty) => (
        <span className="font-mono text-sm font-semibold text-gray-800">{f.faculty_id}</span>
      ),
    },
    {
      key: 'name',
      label: 'Faculty Member',
      render: (f: Faculty) => (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {f.first_name?.[0]}{f.last_name?.[0]}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate">{f.first_name} {f.last_name}</div>
            <div className="text-xs text-gray-500 truncate">{f.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (f: Faculty) => (
        <span className="text-sm text-gray-700">{f.specialization || '—'}</span>
      ),
    },
    {
      key: 'employment_status',
      label: 'Employment Status',
      render: (f: Faculty) => getStatusBadge(f.employment_status),
    },
  ];

  const activeFiltersCount = [department].filter(Boolean).length + employmentStatus.length;

  const appliedChips: { label: string }[] = [
    ...(filters.search ? [{ label: `"${filters.search}"` }] : []),
    ...(filters.department ? [{ label: `Dept: ${filters.department}` }] : []),
    ...parseMulti(filters.employment_status).map(s => ({ label: `Status: ${s}` })),
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              Faculty Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 ml-11">Manage and view all faculty records</p>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-xs text-gray-500 font-medium">Total Faculty</div>
            <div className="text-xl font-bold text-orange-600">{faculty.total}</div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          onApply={applyFilters}
          onReset={resetFilters}
          activeCount={activeFiltersCount}
          searchPlaceholder="Search by name, faculty ID, or email..."
          filters={[
            {
              name: 'department',
              label: 'Department',
              value: department,
              options: [
                { label: 'Computer Science', value: 'CS' },
                { label: 'Information Technology', value: 'IT' },
                { label: 'Engineering', value: 'ENG' },
              ],
              onChange: setDepartment,
            },
            {
              name: 'employment_status',
              label: 'Employment Status',
              type: 'multiselect' as const,
              value: employmentStatus,
              options: [
                { label: 'Full-time', value: 'full-time' },
                { label: 'Part-time', value: 'part-time' },
                { label: 'Contractual', value: 'contractual' },
              ],
              onChange: (v: string[]) => setEmploymentStatus(v),
            },
          ]}
        />

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                {faculty.total} {faculty.total === 1 ? 'faculty member' : 'faculty members'} found
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

          <DataTable
            columns={columns}
            data={faculty.data}
            actions={{ onView: handleView }}
          />

          <Pagination
            currentPage={faculty.current_page}
            lastPage={faculty.last_page}
            total={faculty.total}
            perPage={faculty.per_page}
          />
        </div>
      </div>
    </AppLayout>
  );
}
