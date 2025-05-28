import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Users, Calendar, Camera, User, LogOut, Menu, X 
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isAdmin = user?.role === 'admin';
  const isActive = (path: string) => location.pathname === path;

  const adminLinks = [
    { path: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/admin/employees', label: 'Employees', icon: <Users size={20} /> },
    { path: '/admin/attendance', label: 'Attendance', icon: <Calendar size={20} /> },
    { path: '/admin/face-scan', label: 'Face Scan', icon: <Camera size={20} /> },
  ];

  const employeeLinks = [
    { path: '/employee', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/employee/profile', label: 'My Profile', icon: <User size={20} /> },
  ];

  const links = isAdmin ? adminLinks : employeeLinks;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-700"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 w-64 transition-transform duration-300 ease-in-out transform bg-white border-r border-gray-200 z-40`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">FaceID</h1>
            <p className="text-sm text-gray-500">Attendance System</p>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  ${isActive(link.path) 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  group flex items-center w-full px-4 py-3 text-left rounded-md transition-colors
                `}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main 
        className="flex-1 overflow-auto"
        onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
      >
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;