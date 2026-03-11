import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import { PaginatedData, PageProps } from '@/types/database';

interface Material {
  id: number;
  title: string;
  type: string;
  description: string;
  subject: {
    subject_code: string;
    subject_name: string;
  };
  faculty: {
    first_name: string;
    last_name: string;
  };
  school_year: string;
  semester: string;
}

interface Props extends PageProps {
  materials: PaginatedData<Material>;
  filters: { search: string; type: string; subject_id: string; faculty_id: string; };
  subjects: Array<{ id: number; subject_code: string; subject_name: string; }>;
  faculty: Array<{ id: number; first_name: string; last_name: string; }>;
}

export default function InstructionalIndex({ materials, filters, subjects, faculty }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [type, setType] = useState(filters.type || '');
  const [subjectId, setSubjectId] = useState(filters.subject_id || '');
  const [facultyId, setFacultyId] = useState(filters.faculty_id || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/instructional', { search: value, type, subject_id: subjectId, faculty_id: facultyId }, { preserveState: true });
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { 
      key: 'subject', 
      label: 'Subject',
      render: (m: Material) => `${m.subject.subject_code} - ${m.subject.subject_name}`
    },
    { 
      key: 'faculty', 
      label: 'Faculty',
      render: (m: Material) => `${m.faculty.first_name} ${m.faculty.last_name}`
    },
    { 
      key: 'period', 
      label: 'Period',
      render: (m: Material) => `${m.school_year} ${m.semester}`
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Instructional Materials</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={[
                {
                  name: 'type',
                  label: 'Material Type',
                  value: type,
                  options: [
                    { label: 'Syllabus', value: 'syllabus' },
                    { label: 'Lesson Plan', value: 'lesson_plan' },
                    { label: 'Module', value: 'module' },
                    { label: 'Presentation', value: 'presentation' },
                    { label: 'Assessment', value: 'assessment' },
                  ],
                  onChange: (value) => {
                    setType(value);
                    router.get('/instructional', { search, type: value, subject_id: subjectId, faculty_id: facultyId }, { preserveState: true });
                  },
                },
                {
                  name: 'subject_id',
                  label: 'Subject',
                  value: subjectId,
                  options: subjects.map(s => ({
                    label: `${s.subject_code} - ${s.subject_name}`,
                    value: s.id.toString()
                  })),
                  onChange: (value) => {
                    setSubjectId(value);
                    router.get('/instructional', { search, type, subject_id: value, faculty_id: facultyId }, { preserveState: true });
                  },
                },
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
                    router.get('/instructional', { search, type, subject_id: subjectId, faculty_id: value }, { preserveState: true });
                  },
                },
              ]}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search materials..." />
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <DataTable columns={columns} data={materials.data} />
              <Pagination
                currentPage={materials.current_page}
                lastPage={materials.last_page}
                total={materials.total}
                perPage={materials.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
