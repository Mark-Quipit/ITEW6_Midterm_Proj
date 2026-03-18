import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
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

function parseMulti(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').filter(Boolean);
}

export default function InstructionalIndex({ materials, filters, subjects = [], faculty = [] }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [type, setType] = useState<string[]>(parseMulti(filters.type));
  const [subjectId, setSubjectId] = useState(filters.subject_id || '');
  const [facultyId, setFacultyId] = useState(filters.faculty_id || '');

  const applyFilters = () => {
    router.get('/instructional', {
      search,
      type: type.join(','),
      subject_id: subjectId,
      faculty_id: facultyId,
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setSearch('');
    setType([]);
    setSubjectId('');
    setFacultyId('');
    router.get('/instructional', {}, { preserveState: true });
  };

  const getTypeBadge = (t: string) => {
    const cfg: Record<string, { bg: string; text: string }> = {
      syllabus: { bg: 'bg-purple-100', text: 'text-purple-800' },
      lesson_plan: { bg: 'bg-blue-100', text: 'text-blue-800' },
      module: { bg: 'bg-green-100', text: 'text-green-800' },
      presentation: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      assessment: { bg: 'bg-red-100', text: 'text-red-800' },
    };
    const c = cfg[t?.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        {t}
      </span>
    );
  };

  const columns = [
    {
      key: 'title',
      label: 'Material',
      render: (m: Material) => (
        <div>
          <div className="font-medium text-gray-900">{m.title}</div>
          <div className="text-xs text-gray-500 truncate">{m.description || '—'}</div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (m: Material) => getTypeBadge(m.type),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (m: Material) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{m.subject.subject_code}</div>
          <div className="text-xs text-gray-500">{m.subject.subject_name}</div>
        </div>
      ),
    },
    {
      key: 'faculty',
      label: 'Faculty',
      render: (m: Material) => (
        <span className="text-sm text-gray-700">{m.faculty.first_name} {m.faculty.last_name}</span>
      ),
    },
    {
      key: 'period',
      label: 'Period',
      render: (m: Material) => (
        <div className="text-sm text-gray-700">
          <div>{m.school_year}</div>
          <div className="text-xs text-gray-500">{m.semester}</div>
        </div>
      ),
    },
  ];

  const activeFiltersCount = [subjectId, facultyId].filter(Boolean).length + type.length;

  const appliedChips: { label: string }[] = [
    ...(filters.search ? [{ label: `"${filters.search}"` }] : []),
    ...parseMulti(filters.type).map(t => ({ label: `Type: ${t}` })),
    ...(filters.subject_id && subjects.length > 0 ? [{ label: `Subject: ${subjects.find(s => s.id.toString() === filters.subject_id)?.subject_code || filters.subject_id}` }] : []),
    ...(filters.faculty_id && faculty.length > 0 ? [{ label: `Faculty: ${faculty.find(f => f.id.toString() === filters.faculty_id)?.first_name || filters.faculty_id}` }] : []),
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              Instructional Materials
            </h1>
            <p className="mt-1 text-sm text-gray-500 ml-11">Browse and manage course materials</p>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-xs text-gray-500 font-medium">Total Materials</div>
            <div className="text-xl font-bold text-orange-600">{materials.total}</div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          onApply={applyFilters}
          onReset={resetFilters}
          activeCount={activeFiltersCount}
          searchPlaceholder="Search by title or description..."
          filters={[
            {
              name: 'type',
              label: 'Material Type',
              type: 'multiselect' as const,
              value: type,
              options: [
                { label: 'Syllabus', value: 'syllabus' },
                { label: 'Lesson Plan', value: 'lesson_plan' },
                { label: 'Module', value: 'module' },
                { label: 'Presentation', value: 'presentation' },
                { label: 'Assessment', value: 'assessment' },
              ],
              onChange: (v: string[]) => setType(v),
            },
            {
              name: 'subject_id',
              label: 'Subject',
              value: subjectId,
              options: subjects.map(s => ({
                label: `${s.subject_code} - ${s.subject_name}`,
                value: s.id.toString(),
              })),
              onChange: setSubjectId,
            },
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
          ]}
        />

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                {materials.total} {materials.total === 1 ? 'material' : 'materials'} found
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

          <DataTable columns={columns} data={materials.data} />

          <Pagination
            currentPage={materials.current_page}
            lastPage={materials.last_page}
            total={materials.total}
            perPage={materials.per_page}
          />
        </div>
      </div>
    </AppLayout>
  );
}
