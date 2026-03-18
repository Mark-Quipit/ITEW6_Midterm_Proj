import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import StudentForm from '@/components/students/StudentForm';
import { PageProps } from '@/types/database';

interface Props extends PageProps {}

export default function StudentCreate({}: Props) {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Student
            </h1>
            <p className="mt-1 text-sm text-gray-600">Create a new student record in the system</p>
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
          <StudentForm onCancel={handleCancel} />
        </div>
      </div>
    </AppLayout>
  );
}