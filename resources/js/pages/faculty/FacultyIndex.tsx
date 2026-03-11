import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Faculty, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  faculty: PaginatedData<Faculty>;
  filters: { search: string; department: string; };
}

export default function FacultyIndex({ faculty, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [department, setDepartment] = useState(filters.department || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/faculty', { search: value, department }, { preserveState: true });
  };

  const columns = [
    { key: 'faculty_id', label: 'Faculty ID' },
    { 
      key: 'name', 
      label: 'Name',
      render: (f: Faculty) => `${f.first_name} ${f.last_name}`
    },
    { key: 'email', label: 'Email' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'employment_status', label: 'Status' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Faculty</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={[
                {
                  name: 'department',
                  label: 'Department',
                  value: department,
                  options: [
                    { label: 'Computer Science', value: 'CS' },
                    { label: 'Information Technology', value: 'IT' },
                  ],
                  onChange: (value) => {
                    setDepartment(value);
                    router.get('/faculty', { search, department: value }, { preserveState: true });
                  },
                },
              ]}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search faculty..." />
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <DataTable
                columns={columns}
                data={faculty.data}
                onRowClick={(f) => router.visit(`/faculty/${f.id}`)}
              />
              <Pagination
                currentPage={faculty.current_page}
                lastPage={faculty.last_page}
                total={faculty.total}
                perPage={faculty.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
