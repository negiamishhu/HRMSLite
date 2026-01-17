import { NavLink } from 'react-router-dom';
import { HiHome, HiUsers, HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const navItems = [
  { path: '/', icon: HiHome, label: 'Dashboard', description: 'Overview & Stats' },
  { path: '/employees', icon: HiUsers, label: 'Employees', description: 'Manage Staff' },
  { path: '/attendance', icon: HiCalendar, label: 'Attendance', description: 'Track Records' },
];

export default function Sidebar({ isOpen, width, onToggle }) {
  return (
    <aside
      style={{ width: `${width}px` }}
      className="bg-slate-900 fixed left-0 top-0 h-full transition-all duration-300 ease-in-out z-50 shadow-2xl"
    >
       <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50"
      >
        {isOpen ? (
          <HiChevronLeft className="w-4 h-4" />
        ) : (
          <HiChevronRight className="w-4 h-4" />
        )}
      </button>

      <div className="border-b  border-slate-700/50 ">
        <div className="flex items-center gap-3 ">
          {isOpen && (
            <div className="animate-fadeIn">
              <h1 className="text-xl mb-4  px-8 font-bold bg-white mt-10 bg-clip-text text-transparent">
                HRMS Lite
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className=" mt-10 px-3">
 
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center ${isOpen ? 'px-4' : 'justify-center'} py-3.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                  {isOpen && (
                    <div className="animate-fadeIn">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <p className={`text-xs ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                  {!isOpen && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section - User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
        <div className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}>
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0">
            A
          </div>
          {isOpen && (
            <div className="animate-fadeIn">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
