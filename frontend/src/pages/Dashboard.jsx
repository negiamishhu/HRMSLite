import { Link } from 'react-router-dom';
import { HiUsers, HiCheck, HiX, HiClock, HiRefresh, HiArrowRight, HiCalendar, HiChartBar, HiSparkles, HiTrendingUp } from 'react-icons/hi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Card, Table, Button } from '../components';
import { useDashboard } from '../hooks/useDashboard';

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const { data, loading, attendanceRate, refetch } = useDashboard();

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-96"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                <div className="h-4 w-16 bg-gray-100 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-32"></div>
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-100 rounded-xl"></div>
              <div className="h-20 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statsColumns = [
    {
      key: 'employee_code',
      label: 'Employee',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            {row.employee_name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.employee_name}</p>
            <p className="text-sm text-gray-500">{row.employee_code}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'present_days',
      label: 'Present Days',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <HiCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-700">{row.present_days}</span>
            <span className="text-emerald-600 text-sm">days</span>
          </div>
        </div>
      ),
    },
    {
      key: 'attendance_rate',
      label: 'Performance',
      render: (row) => {
        const rate = row.present_days > 0 ? Math.min(100, row.present_days * 5) : 0;
        return (
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${rate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{rate}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-indigo-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HiSparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium text-white/80">{getGreeting()}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to HRMS Lite</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                <HiCalendar className="w-4 h-4" />
                <span>Today</span>
                      <p className="text-sm font-semibold">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              </div>
        
            </div>
            <Button
              onClick={refetch}
              variant="secondary"
              className="!bg-white/20 !text-white hover:!bg-white/30 !border-white/20"
            >
              <HiRefresh className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Employees"
          value={data?.total_employees || 0}
          icon={HiUsers}
          color="indigo"
        />
        <Card
          title="Present Today"
          value={data?.today?.present || 0}
          icon={HiCheck}
          color="green"
          subtitle={`${attendanceRate}% attendance rate`}
        />
        <Card
          title="Absent Today"
          value={data?.today?.absent || 0}
          icon={HiX}
          color="red"
          subtitle={`of ${data?.total_employees || 0} employees`}
        />
        <Card
          title="Not Marked"
          value={data?.today?.not_marked || 0}
          icon={HiClock}
          color="yellow"
          subtitle="Pending attendance"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <HiChartBar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
                <p className="text-sm text-gray-500">Real-time attendance overview</p>
              </div>
            </div>
          </div>

          {data?.total_employees > 0 ? (
            <div className="space-y-6">
              {/* Present Bar */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="font-medium text-gray-700">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{data?.today?.present || 0}</span>
                    <span className="text-sm text-gray-500">
                      ({Math.round((data?.today?.present / data?.total_employees) * 100) || 0}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700 ease-out group-hover:shadow-lg group-hover:shadow-green-200"
                    style={{
                      width: `${Math.round((data?.today?.present / data?.total_employees) * 100) || 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Absent Bar */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="font-medium text-gray-700">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{data?.today?.absent || 0}</span>
                    <span className="text-sm text-gray-500">
                      ({Math.round((data?.today?.absent / data?.total_employees) * 100) || 0}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all duration-700 ease-out group-hover:shadow-lg group-hover:shadow-red-200"
                    style={{
                      width: `${Math.round((data?.today?.absent / data?.total_employees) * 100) || 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Not Marked Bar */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="font-medium text-gray-700">Not Marked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{data?.today?.not_marked || 0}</span>
                    <span className="text-sm text-gray-500">
                      ({Math.round((data?.today?.not_marked / data?.total_employees) * 100) || 0}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-700 ease-out group-hover:shadow-lg group-hover:shadow-amber-200"
                    style={{
                      width: `${Math.round((data?.today?.not_marked / data?.total_employees) * 100) || 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Summary Circle */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <Doughnut
                      data={{
                        datasets: [{
                          data: [attendanceRate, 100 - attendanceRate],
                          backgroundColor: ['#10b981', '#f3f4f6'],
                          borderWidth: 0,
                          cutout: '70%',
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: { tooltip: { enabled: false } },
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{attendanceRate}%</span>
                      <span className="text-sm text-gray-500">Attendance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <HiUsers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Employees Yet</h3>
              <p className="text-gray-500 mb-4">Add employees to start tracking attendance</p>
              <Link to="/employees">
                <Button variant="primary">
                  <HiUsers className="w-4 h-4 mr-2" />
                  Add Employees
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/employees"
                className="group flex items-center justify-between p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all duration-200 border border-indigo-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                    <HiUsers className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Manage Employees</span>
                    <p className="text-sm text-gray-500">Add, view, or remove</p>
                  </div>
                </div>
                <HiArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/attendance"
                className="group flex items-center justify-between p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all duration-200 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                    <HiCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Mark Attendance</span>
                    <p className="text-sm text-gray-500">Record daily status</p>
                  </div>
                </div>
                <HiArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <HiTrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="font-semibold">Quick Stats</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-400">Total Employees</span>
                <span className="text-2xl font-bold">{data?.total_employees || 0}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-400">Attendance Rate</span>
                <span className="text-2xl font-semibold text-emerald-400">{attendanceRate}%</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-400">Pending Actions</span>
                <span className="text-2xl font-semibold text-emerald-400">{data?.today?.not_marked || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <HiChartBar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Employee Statistics</h2>
                <p className="text-sm text-gray-500">All-time attendance records</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {data?.employee_stats?.length || 0} employees
            </span>
          </div>
        </div>
        <div className="p-6">
          <Table
            columns={statsColumns}
            data={data?.employee_stats || []}
            loading={loading}
            emptyMessage="No attendance data available yet. Start marking attendance to see statistics here."
          />
        </div>
      </div>
    </div>
  );
}
