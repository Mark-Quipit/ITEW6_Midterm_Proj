import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { PageProps } from '@/types/database';

export default function SchedulingIndex({ }: PageProps) {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Scheduling</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Scheduling module - Coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
}
