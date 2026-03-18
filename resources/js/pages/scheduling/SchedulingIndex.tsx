import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { PaginatedData, PageProps } from '@/types/database';

interface Schedule {
  id: number;
  subject: {
    subject_code: string;
    subject_name: string;
  };
  faculty: {
    first_name: string;
    last_name: string;
  };
  section: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room: string;
}

interface Props extends PageProps {
  schedules: PaginatedData<Schedule>;
  filters: { search: string; faculty_id: string; section: string; day: string; };
  faculty: Array<{ id: number; first_name: string; last_name: string; }>;
}

function parseMulti(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').filter(Boolean);
}

export default function SchedulingIndex({ schedules, filters, faculty = [] }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [facultyId, setFacultyId] = useState(filters.faculty_id || '');
  const [section, setSection] = useState(filters.section || '');
  const [day, setDay] = useState<string[]>(parseMulti(filters.day));

  const applyFilters = () => {
    router.get('/scheduling', {
      search,
      faculty_id: facultyId,
      section,
      day: day.join(','),
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setSearch('');
    setFacultyId('');
    setSection('');
    setDay([]);
    router.get('/scheduling', {}, { preserveState: true });
  };

  const getDayBadge = (d: string) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-purple-100 text-purple-800', 'bg-pink-100 text-pink-800'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const idx = days.indexOf(d);
    const color = idx >= 0 ? colors[idx] : 'bg-gray-100 text-gray-800';
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        {d}
      </span>
    );
  };

  const columns = [
    {
      key: 'subject',
      label: 'Subject',
      render: (s: Schedule) => (
        <div>
          <div className="font-medium text-gray-900">{s.subject.subject_code}</div>
          <div className="text-xs text-gray-500 truncate">{s.subject.subject_name}</div>
        </div>
      ),
    },
    {
      key: 'faculty',
      label: 'Faculty',
      render: (s: Schedule) => (
        <span className="text-sm text-gray-700">{s.faculty.first_name} {s.faculty.last_name}</span>
      ),
    },
    {
      key: 'section',
      label: 'Section',
      render: (s: Schedule) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
          {s.section}
        </span>
      ),
    },
    {
      key: 'day_of_week',
      label: 'Day',
      render: (s: Schedule) => getDayBadge(s.day_of_week),
    },
    {
      key: 'time',
      label: 'Time',
      render: (s: Schedule) => (
        <div className="text-sm text-gray-700">
          <div className="font-medium">{s.start_time}</div>
          <div className="text-xs text-gray-500">{s.end_time}</div>
        </div>
      ),
    },
    {
      key: 'room',
      label: 'Room',
      render: (s: Schedule) => (
        <span className="font-mono text-sm font-semibold text-gray-800">{s.room}</span>
      ),
    },
  ];

  const activeFiltersCount = [facultyId, section].filter(Boolean).length + day.length;

  const appliedChips: { label: string }[] = [
    ...(filters.search ? [{ label: `"${filters.search}"` }] : []),
    ...(filters.faculty_id && faculty.length > 0 ? [{ label: `Faculty: ${faculty.find(f => f.id.toString() === filters.faculty_id)?.first_name || filters.faculty_id}` }] : []),
    ...(filters.section ? [{ label: `Section: ${filters.section}` }] : []),
    ...parseMulti(filters.day).map(d => ({ label: `Day: ${d}` })),
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Class Scheduling
            </h1>
            <p className="mt-1 text-sm text-gray-500 ml-11">View and manage class schedules</p>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-xs text-gray-500 font-medium">Total Schedules</div>
            <div className="text-xl font-bold text-orange-600">{schedules.total}</div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          onApply={applyFilters}
          onReset={resetFilters}
          activeCount={activeFiltersCount}
          searchPlaceholder="Search by subject, faculty, or room..."
          filters={[
            {
              name: 'faculty_id',
              label: 'Faculty',
              value: facultyId,
              options: faculty.map(f => ({
                label: `${f.first_name} ${f.last_name}`,
                value: f.id.toString(),
              })),
              onChange: setFacultyId,
            },
            {
              name: 'section',
              label: 'Section',
              value: section,
              options: [
                { label: 'Section A', value: 'A' },
                { label: 'Section B', value: 'B' },
                { label: 'Section C', value: 'C' },
                { label: 'Section D', value: 'D' },
              ],
              onChange: setSection,
            },
            {
              name: 'day',
              label: 'Day of Week',
              type: 'multiselect' as const,
              value: day,
              options: [
                { label: 'Monday', value: 'Monday' },
                { label: 'Tuesday', value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday', value: 'Thursday' },
                { label: 'Friday', value: 'Friday' },
              ],
              onChange: (v: string[]) => setDay(v),
            },
          ]}
        />

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                {schedules.total} {schedules.total === 1 ? 'schedule' : 'schedules'} found
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

          <DataTable columns={columns} data={schedules.data} />

          <Pagination
            currentPage={schedules.current_page}
            lastPage={schedules.last_page}
            total={schedules.total}
            perPage={schedules.per_page}
          />
        </div>
      </div>
    </AppLayout>
  );
}
