import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SearchBar from '@/components/ui/SearchBar';
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

export default function SchedulingIndex({ schedules, filters, faculty }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [facultyId, setFacultyId] = useState(filters.faculty_id || '');
  const [section, setSection] = useState(filters.section || '');
  const [day, setDay] = useState(filters.day || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/scheduling', { search: value, faculty_id: facultyId, section, day }, { preserveState: true });
  };

  const columns = [
    { 
      key: 'subject', 
      label: 'Subject',
      render: (s: Schedule) => `${s.subject.subject_code} - ${s.subject.subject_name}`
    },
    { 
      key: 'faculty', 
      label: 'Faculty',
      render: (s: Schedule) => `${s.faculty.first_name} ${s.faculty.last_name}`
    },
    { key: 'section', label: 'Section' },
    { key: 'day_of_week', label: 'Day' },
    { 
      key: 'time', 
      label: 'Time',
      render: (s: Schedule) => `${s.start_time} - ${s.end_time}`
    },
    { key: 'room', label: 'Room' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Class Schedules</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={[
                {
                  name: 'faculty_id',
                  label: 'Faculty',
                  value: facultyId,
                  options: faculty.map(f => ({
                    label: `${f.first_name} ${f.last_name}`,
                    value: f.id.toString()
                  })),
                  onChange: (value) => {
                    setFacultyId(value);
                    router.get('/scheduling', { search, faculty_id: value, section, day }, { preserveState: true });
                  },
                },
                {
                  name: 'section',
                  label: 'Section',
                  value: section,
                  options: [
                    { label: 'Section A', value: 'A' },
                    { label: 'Section B', value: 'B' },
                    { label: 'Section C', value: 'C' },
                  ],
                  onChange: (value) => {
                    setSection(value);
                    router.get('/scheduling', { search, faculty_id: facultyId, section: value, day }, { preserveState: true });
                  },
                },
                {
                  name: 'day',
                  label: 'Day',
                  value: day,
                  options: [
                    { label: 'Monday', value: 'Monday' },
                    { label: 'Tuesday', value: 'Tuesday' },
                    { label: 'Wednesday', value: 'Wednesday' },
                    { label: 'Thursday', value: 'Thursday' },
                    { label: 'Friday', value: 'Friday' },
                  ],
                  onChange: (value) => {
                    setDay(value);
                    router.get('/scheduling', { search, faculty_id: facultyId, section, day: value }, { preserveState: true });
                  },
                },
              ]}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search schedules..." />
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <DataTable columns={columns} data={schedules.data} />
              <Pagination
                currentPage={schedules.current_page}
                lastPage={schedules.last_page}
                total={schedules.total}
                perPage={schedules.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
