import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Event, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  events: PaginatedData<Event>;
  filters: { search: string; event_type: string; status: string; };
}

function parseMulti(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').filter(Boolean);
}

export default function EventIndex({ events, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [eventType, setEventType] = useState(filters.event_type || '');
  const [status, setStatus] = useState<string[]>(parseMulti(filters.status));

  const applyFilters = () => {
    router.get('/events', {
      search,
      event_type: eventType,
      status: status.join(','),
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setSearch('');
    setEventType('');
    setStatus([]);
    router.get('/events', {}, { preserveState: true });
  };

  const getStatusBadge = (s: string | undefined) => {
    const cfg: Record<string, { bg: string; text: string; dot: string }> = {
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
      ongoing: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    };
    const c = cfg[s?.toLowerCase() || 'upcoming'] || cfg.upcoming;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Upcoming'}
      </span>
    );
  };

  const columns = [
    {
      key: 'event_name',
      label: 'Event Name',
      render: (e: Event) => (
        <div>
          <div className="font-medium text-gray-900">{e.event_name}</div>
          <div className="text-xs text-gray-500">{e.event_type || '—'}</div>
        </div>
      ),
    },
    {
      key: 'event_date',
      label: 'Date',
      render: (e: Event) => (
        <span className="text-sm text-gray-700">{e.event_date || '—'}</span>
      ),
    },
    {
      key: 'venue',
      label: 'Venue',
      render: (e: Event) => (
        <span className="text-sm text-gray-700">{e.venue || '—'}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (e: Event) => getStatusBadge(e.status),
    },
  ];

  const activeFiltersCount = [eventType].filter(Boolean).length + status.length;

  const appliedChips: { label: string }[] = [
    ...(filters.search ? [{ label: `"${filters.search}"` }] : []),
    ...(filters.event_type ? [{ label: `Type: ${filters.event_type}` }] : []),
    ...parseMulti(filters.status).map(s => ({ label: `Status: ${s}` })),
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              Events Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 ml-11">Manage and view all events</p>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-xs text-gray-500 font-medium">Total Events</div>
            <div className="text-xl font-bold text-orange-600">{events.total}</div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          onApply={applyFilters}
          onReset={resetFilters}
          activeCount={activeFiltersCount}
          searchPlaceholder="Search by event name or venue..."
          filters={[
            {
              name: 'event_type',
              label: 'Event Type',
              value: eventType,
              options: [
                { label: 'Seminar', value: 'seminar' },
                { label: 'Workshop', value: 'workshop' },
                { label: 'Conference', value: 'conference' },
                { label: 'Training', value: 'training' },
              ],
              onChange: setEventType,
            },
            {
              name: 'status',
              label: 'Status',
              type: 'multiselect' as const,
              value: status,
              options: [
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
              ],
              onChange: (v: string[]) => setStatus(v),
            },
          ]}
        />

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                {events.total} {events.total === 1 ? 'event' : 'events'} found
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

          <DataTable columns={columns} data={events.data} />

          <Pagination
            currentPage={events.current_page}
            lastPage={events.last_page}
            total={events.total}
            perPage={events.per_page}
          />
        </div>
      </div>
    </AppLayout>
  );
}
