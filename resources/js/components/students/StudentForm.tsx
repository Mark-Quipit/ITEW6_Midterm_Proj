import { useState, FormEvent } from 'react';
import { router } from '@inertiajs/react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Student } from '@/types/database';

interface StudentFormProps {
  student?: Student;
  onCancel: () => void;
}

interface FormData {
  student_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  gender: string;
  program: string;
  year_level: string;
  section: string;
  status: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function StudentForm({ student, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    student_id: student?.student_id || '',
    first_name: student?.first_name || '',
    middle_name: student?.middle_name || '',
    last_name: student?.last_name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    birth_date: student?.birth_date || '',
    gender: student?.gender || '',
    program: student?.program || '',
    year_level: student?.year_level?.toString() || '',
    section: student?.section || '',
    status: student?.status || 'active'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.student_id.trim()) newErrors.student_id = 'Student ID is required';
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.program.trim()) newErrors.program = 'Program is required';
    if (!formData.year_level) newErrors.year_level = 'Year level is required';
    if (!formData.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    const submitData = {
      ...formData,
      year_level: parseInt(formData.year_level)
    };

    if (student) {
      router.put(`/students/${student.id}`, submitData, {
        onSuccess: () => {
          onCancel();
        },
        onError: (errors) => {
          setErrors(errors);
          setLoading(false);
        },
        onFinish: () => setLoading(false)
      });
    } else {
      router.post('/students', submitData, {
        onSuccess: () => {
          onCancel();
        },
        onError: (errors) => {
          setErrors(errors);
          setLoading(false);
        },
        onFinish: () => setLoading(false)
      });
    }
  };

  const programOptions = [
    { value: 'BSCS', label: 'Bachelor of Science in Computer Science' },
    { value: 'BSIT', label: 'Bachelor of Science in Information Technology' },
    { value: 'ACT', label: 'Associate in Computer Technology' }
  ];

  const yearLevelOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'suspended', label: 'Suspended' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Student ID"
          value={formData.student_id}
          onChange={(e) => handleChange('student_id', e.target.value)}
          error={errors.student_id}
          required
          placeholder="e.g., 2024-001"
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          options={statusOptions}
          error={errors.status}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="First Name"
          value={formData.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
          error={errors.first_name}
          required
        />

        <Input
          label="Middle Name"
          value={formData.middle_name}
          onChange={(e) => handleChange('middle_name', e.target.value)}
          error={errors.middle_name}
        />

        <Input
          label="Last Name"
          value={formData.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
          error={errors.last_name}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="e.g., +63 912 345 6789"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Birth Date"
          type="date"
          value={formData.birth_date}
          onChange={(e) => handleChange('birth_date', e.target.value)}
          error={errors.birth_date}
        />

        <Select
          label="Gender"
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          options={genderOptions}
          error={errors.gender}
          placeholder="Select gender"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          label="Program"
          value={formData.program}
          onChange={(e) => handleChange('program', e.target.value)}
          options={programOptions}
          error={errors.program}
          required
        />

        <Select
          label="Year Level"
          value={formData.year_level}
          onChange={(e) => handleChange('year_level', e.target.value)}
          options={yearLevelOptions}
          error={errors.year_level}
          required
        />

        <Input
          label="Section"
          value={formData.section}
          onChange={(e) => handleChange('section', e.target.value)}
          error={errors.section}
          placeholder="e.g., A, B, C"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          {student ? 'Update Student' : 'Create Student'}
        </Button>
      </div>
    </form>
  );
}