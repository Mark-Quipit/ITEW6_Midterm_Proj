import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import FilterPanel from '@/components/ui/FilterPanel';
import DataTable from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Toast from '@/components/ui/Toast';
import StudentForm from '@/components/students/StudentForm';
import { Student, PaginatedData, PageProps } from '@/types/database';

interface Props extends PageProps {
  students: PaginatedData<Student>;
  filters: {
    search: string;
    program: string;
    year_level: string;
    status: string;
    gender: string;
  };
}

function parseMulti(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(',').filter(Boolean);
}

export default function StudentIndex({ students, filters, flash }: Props) {
  // Draft filter state (not applied until Apply is clicked)
  const [search, setSearch] = useState(filters.search || '');
  const [program, setProgram] = useState(filters.program || '');
  const [yearLevel, setYearLevel] = useState(filters.year_level || '');
  const [status, setStatus] = useState<string[]>(parseMulti(filters.status));
  const [gender, setGender] = useState<string[]>(parseMulti(filters.gender));

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Delete confirmation
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useState(() => {
    if (flash?.success) setToast({ message: flash.success, type: 'success' });
    else if (flash?.error) setToast({ message: flash.error, type: 'error' });
  });

  const applyFilters = () => {
    router.get('/students', {
      search,
      program,
      year_level: yearLevel,
      status: status.join(','),
      gender: gender.join(','),
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setSearch('');
    setProgram('');
    setYearLevel('');
    setStatus([]);
    setGender([]);
    router.get('/students', {}, { preserveState: true });
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDelete = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!studentToDelete) return;
    setDeleteLoading(true);
    router.delete(`/students/${studentToDelete.id}`, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        setStudentToDelete(null);
        setToast({ message: 'Student deleted successfully', type: 'success' });
      },
      onError: () => setToast({ message: 'Failed to delete student', type: 'error' }),
      onFinish: () => setDeleteLoading(false),
    });
  };

  const handleView = (student: Student) => router.visit(`/students/${student.id}`);

  const getStatusBadge = (s: string | undefined) => {
    const cfg: Record<string, { bg: string; text: string; dot: string }> = {
      active:    { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      inactive:  { bg: 'bg-gray-100',  text: 'text-gray-700',  dot: 'bg-gray-400'  },
      graduated: { bg: 'bg-blue-100',  text: 'text-blue-800',  dot: 'bg-blue-500'  },
      suspended: { bg: 'bg-red-100',   text: 'text-red-800',   dot: 'bg-red-500'   },
    };
    const c = cfg[s?.toLowerCase() || 'inactive'] || cfg.inactive;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Inactive'}
      </span>
    );
  };

  const columns = [
    {
      key: 'student_id',
      label: 'Student ID',
      render: (s: Student) => (
        <span className="font-mono text-sm font-semibold text-gray-800">{s.student_id}</span>
      ),
    },
    {
      key: 'name',
      label: 'Student',
      render: (s: Student) => (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {s.first_name?.[0]}{s.last_name?.[0]}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate">{s.first_name} {s.last_name}</div>
            <div className="text-xs text-gray-500 truncate">{s.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'program',
      label: 'Program',
      render: (s: Student) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
          {s.program}
        </span>
      ),
    },
    {
      key: 'year_level',
      label: 'Year & Section',
      render: (s: Student) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {s.year_level}{s.year_level === 1 ? 'st' : s.year_level === 2 ? 'nd' : s.year_level === 3 ? 'rd' : 'th'} Year
          </div>
          <div className="text-xs text-gray-500">{s.section ? `Section ${s.section}` : '—'}</div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (s: Student) => getStatusBadge(s.status),
    },
  ];

  const activeFiltersCount =
    [program, yearLevel].filter(Boolean).length + status.length + gender.length;

  // Applied filter chips (from actual URL filters, not draft)
  const appliedChips: { label: string }[] = [
    ...(filters.search ? [{ label: `"${filters.search}"` }] : []),
    ...(filters.program ? [{ label: `Program: ${filters.program}` }] : []),
    ...(filters.year_level ? [{ label: `Year: ${filters.year_level}` }] : []),
    ...parseMulti(filters.status).map(s => ({ label: `Status: ${s}` })),
    ...parseMulti(filters.gender).map(g => ({ label: `Gender: ${g}` })),
  ];

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 bg-orange-100 rounded-lg">
                <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              Students Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 ml-11">Manage and view all student records</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-xs text-gray-500 font-medium">Total Students</div>
              <div className="text-xl font-bold text-orange-600">{students.total}</div>
            </div>
            <Button variant="primary" onClick={() => setShowCreateModal(true)} className="shadow-sm">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Student
            </Button>
          </div>
        </div>

        {/* ── Filter Panel ── */}
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          onApply={applyFilters}
          onReset={resetFilters}
          activeCount={activeFiltersCount}
          searchPlaceholder="Search by name, student ID, or email..."
          filters={[
            {
              name: 'program',
              label: 'Program',
              value: program,
              options: [
                { label: 'BSCS', value: 'BSCS' },
                { label: 'BSIT', value: 'BSIT' },
                { label: 'ACT',  value: 'ACT'  },
              ],
              onChange: setProgram,
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
              onChange: setYearLevel,
            },
            {
              name: 'status',
              label: 'Status',
              type: 'multiselect' as const,
              value: status,
              options: [
                { label: 'Active',    value: 'active'    },
                { label: 'Inactive',  value: 'inactive'  },
                { label: 'Graduated', value: 'graduated' },
                { label: 'Suspended', value: 'suspended' },
              ],
              onChange: (v: string[]) => setStatus(v),
            },
            {
              name: 'gender',
              label: 'Gender',
              type: 'multiselect' as const,
              value: gender,
              options: [
                { label: 'Male',   value: 'Male'   },
                { label: 'Female', value: 'Female' },
                { label: 'Other',  value: 'Other'  },
              ],
              onChange: (v: string[]) => setGender(v),
            },
          ]}
        />

        {/* ── Results Section ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Table toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                {students.total} {students.total === 1 ? 'student' : 'students'} found
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

          {/* Table */}
          <DataTable
            columns={columns}
            data={students.data}
            actions={{
              onView: handleView,
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />

          {/* Pagination */}
          <Pagination
            currentPage={students.current_page}
            lastPage={students.last_page}
            total={students.total}
            perPage={students.per_page}
          />
        </div>
      </div>

      {/* ── Modals ── */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Student" maxWidth="2xl">
        <StudentForm onCancel={() => setShowCreateModal(false)} />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setSelectedStudent(null); }}
        title="Edit Student"
        maxWidth="2xl"
      >
        {selectedStudent && (
          <StudentForm
            student={selectedStudent}
            onCancel={() => { setShowEditModal(false); setSelectedStudent(null); }}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => { setShowDeleteDialog(false); setStudentToDelete(null); }}
        onConfirm={confirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete?.first_name} ${studentToDelete?.last_name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        loading={deleteLoading}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}
