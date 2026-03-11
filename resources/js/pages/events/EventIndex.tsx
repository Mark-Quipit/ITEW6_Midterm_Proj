import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Event, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  events: PaginatedData<Event>;
  filters: { search: string; event_type: string; };
}

export default function EventIndex({ events, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [eventType, setEventType] = useState(filters.event_type || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/events', { search: value, event_type: eventType }, { preserveState: true });
  };

  const columns = [
    { key: 'event_name', label: 'Event Name' },
    { key: 'event_type', label: 'Type' },
    { key: 'event_date', label: 'Date' },
    { key: 'venue', label: 'Venue' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={[
                {
                  name: 'event_type',
                  label: 'Event Type',
                  value: eventType,
                  options: [
                    { label: 'Seminar', value: 'seminar' },
                    { label: 'Workshop', value: 'workshop' },
                    { label: 'Conference', value: 'conference' },
                  ],
                  onChange: (value) => {
                    setEventType(value);
                    router.get('/events', { search, event_type: value }, { preserveState: true });
                  },
                },
              ]}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search events..." />
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <DataTable columns={columns} data={events.data} />
              <Pagination
                currentPage={events.current_page}
                lastPage={events.last_page}
                total={events.total}
                perPage={events.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
