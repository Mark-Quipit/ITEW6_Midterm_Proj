// Student Related Types
export interface Student {
  id: number;
  student_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  gender?: string;
  program?: string;
  year_level?: number;
  section?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentAddress {
  id: number;
  student_id: number;
  address_type: string;
  street?: string;
  barangay?: string;
  city?: string;
  province?: string;
  postal_code?: string;
}

export interface AcademicRecord {
  id: number;
  student_id: number;
  school_year: string;
  semester: string;
  gpa?: number;
  units_earned?: number;
}

export interface AcademicAward {
  id: number;
  student_id: number;
  award_name: string;
  date_received?: string;
  description?: string;
}

export interface Violation {
  id: number;
  student_id: number;
  violation_type: string;
  description?: string;
  date_committed?: string;
  status?: string;
}

// Faculty Related Types
export interface Faculty {
  id: number;
  faculty_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone?: string;
  department_id?: number;
  specialization?: string;
  employment_status?: string;
  created_at: string;
  updated_at: string;
}

export interface FacultyTraining {
  id: number;
  faculty_id: number;
  training_name: string;
  provider?: string;
  date_completed?: string;
  certificate_url?: string;
}

export interface FacultySubjectAssignment {
  id: number;
  faculty_id: number;
  subject_id: number;
  school_year: string;
  semester: string;
}

// Academic Structure Types
export interface Subject {
  id: number;
  subject_code: string;
  subject_name: string;
  units?: number;
  department_id?: number;
}

export interface Department {
  id: number;
  department_code: string;
  department_name: string;
  campus_id?: number;
}

// Event Types
export interface Event {
  id: number;
  event_name: string;
  event_type?: string;
  description?: string;
  event_date?: string;
  venue?: string;
  assigned_faculty_id?: number;
  status?: string;
  created_at: string;
  updated_at: string;
}

// Research Types
export interface Research {
  id: number;
  title: string;
  authors?: string;
  program?: string;
  year_published?: number;
  category?: string;
  evaluation_score?: number;
  abstract?: string;
  created_at: string;
  updated_at: string;
}

// Pagination
export interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Common Props
export interface PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
  flash?: {
    success?: string;
    error?: string;
  };
}
