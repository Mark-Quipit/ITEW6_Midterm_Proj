import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { PageProps } from '@/types/database';

interface DashboardStats {
  students: number;
  faculty: number;
  events: number;
  research: number;
  schedules: number;
  materials: number;
}

interface DashboardProps extends PageProps {
  stats: DashboardStats;
  studentsByProgram: Array<{ program: string; count: number }>;
  studentsByYear: Array<{ year_level: number; count: number }>;
  recentEvents: Array<any>;
  upcomingEvents: Array<any>;
  recentResearch: Array<any>;
  facultyByDepartment: Array<any>;
  todaySchedule: Array<any>;
}

export default function Dashboard({ 
  stats, 
  studentsByProgram, 
  studentsByYear,
  upcomingEvents,
  recentResearch,
  facultyByDepartment,
  todaySchedule 
}: DashboardProps) {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Welcome to CCS Comprehensive Profiling System</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/students" className="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-blue-100 truncate">Total Students</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">{stats.students}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/faculty" className="bg-gradient-to-br from-purple-500 to-purple-600 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-purple-100 truncate">Total Faculty</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">{stats.faculty}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/events" className="bg-gradient-to-br from-green-500 to-green-600 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-green-100 truncate">Upcoming Events</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">{stats.events}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/research" className="bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-orange-100 truncate">Research (This Year)</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">{stats.research}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/scheduling" className="bg-gradient-to-br from-indigo-500 to-indigo-600 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-indigo-100 truncate">Class Schedules</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">{stats.schedules}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/instructional" className="bg-gradient-to-br from-pink-500 to-pink-600 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-pink-100 truncate">Teaching Materials</dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-bold text-white">{stats.materials}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Charts and Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students by Program */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Students by Program</h3>
            <div className="space-y-3">
              {studentsByProgram.map((item) => (
                <div key={item.program}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.program}</span>
                    <span className="text-gray-600">{item.count} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(item.count / stats.students) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students by Year Level */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Students by Year Level</h3>
            <div className="space-y-3">
              {studentsByYear.map((item) => (
                <div key={item.year_level}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Year {item.year_level}</span>
                    <span className="text-gray-600">{item.count} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(item.count / stats.students) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <Link href="/events" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-green-500 pl-3 py-2">
                    <p className="font-medium text-gray-900">{event.event_name}</p>
                    <p className="text-sm text-gray-600">{event.event_type} • {event.venue}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(event.event_date).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No upcoming events</p>
              )}
            </div>
          </div>

          {/* Recent Research */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Research</h3>
              <Link href="/research" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
            </div>
            <div className="space-y-3">
              {recentResearch.map((research) => (
                <div key={research.id} className="border-l-4 border-orange-500 pl-3 py-2">
                  <p className="font-medium text-gray-900 text-sm">{research.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{research.authors}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">{research.program}</span>
                    <span className="text-xs text-gray-500">{research.year_published}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty by Department */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty by Department</h3>
            <div className="space-y-3">
              {facultyByDepartment.map((item) => (
                <div key={item.department_id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {item.department?.department_name || 'Unassigned'}
                  </span>
                  <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    {item.count} faculty
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
              <Link href="/scheduling" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
            </div>
            <div className="space-y-3">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((schedule) => (
                  <div key={schedule.id} className="border-l-4 border-indigo-500 pl-3 py-2">
                    <p className="font-medium text-gray-900 text-sm">
                      {schedule.subject?.subject_code} - {schedule.subject?.subject_name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {schedule.faculty?.first_name} {schedule.faculty?.last_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{schedule.start_time} - {schedule.end_time}</span>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">{schedule.room}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No classes scheduled for today</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
