import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { Student, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  students: PaginatedData<Student>;
  filters: {
    search: string;
    program: string;
    year_level: string;
  };
}

export default function StudentIndex({ students, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [program, setProgram] = useState(filters.program || '');
  const [yearLevel, setYearLevel] = useState(filters.year_level || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/students', { search: value, program, year_level: yearLevel }, { preserveState: true });
  };

  const handleFilterChange = (filterName: string, value: string) => {
    if (filterName === 'program') {
      setProgram(value);
      router.get('/students', { search, program: value, year_level: yearLevel }, { preserveState: true });
    } else if (filterName === 'year_level') {
      setYearLevel(value);
      router.get('/students', { search, program, year_level: value }, { preserveState: true });
    }
  };

  const columns = [
    { key: 'student_id', label: 'Student ID' },
    { 
      key: 'name', 
      label: 'Name',
      render: (student: Student) => `${student.first_name} ${student.last_name}`
    },
    { key: 'program', label: 'Program' },
    { key: 'year_level', label: 'Year Level' },
    { key: 'section', label: 'Section' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        </div>

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
                    { label: 'ACT', value: 'ACT' },
                  ],
                  onChange: (value) => handleFilterChange('program', value),
                },
                {
                  name: 'year_level',
                  label: 'Year Level',
                  value: yearLevel,
                  options: [
                    { label: '1st Year', value: '1' },
                    { label: '2nd Year', value: '2' },
                    { label: '3rd Year', value: '3' },
                    { label: '4th Year', value: '4' },
                  ],
                  onChange: (value) => handleFilterChange('year_level', value),
                },
              ]}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search students..."
            />

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <DataTable
                columns={columns}
                data={students.data}
                onRowClick={(student) => router.visit(`/students/${student.id}`)}
              />
              <Pagination
                currentPage={students.current_page}
                lastPage={students.last_page}
                total={students.total}
                perPage={students.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
