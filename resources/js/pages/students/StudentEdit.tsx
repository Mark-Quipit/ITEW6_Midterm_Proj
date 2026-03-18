import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import StudentForm from '@/components/students/StudentForm';
import { Student, PageProps } from '@/types/database';

interface Props extends PageProps {
  student: Student;
}

export default function StudentEdit({ student }: Props) {
  const handleCancel = () => {
    router.visit('/students');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="h-8 w-8 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Student
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Update information for {student.first_name} {student.last_name} ({student.student_id})
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <StudentForm student={student} onCancel={handleCancel} />
        </div>
      </div>
    </AppLayout>
  );
}