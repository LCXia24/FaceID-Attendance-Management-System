import React, { useState } from 'react';
import { Calendar, Clock, History, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FaceScanner from '../../components/FaceScanner';
import { toast } from 'react-toastify';

// Mock attendance history data
const mockAttendanceHistory = [
  { date: '2025-04-14', timeIn: '08:55 AM', timeOut: '05:10 PM', status: 'present' },
  { date: '2025-04-13', timeIn: '08:50 AM', timeOut: '05:05 PM', status: 'present' },
  { date: '2025-04-12', timeIn: '09:10 AM', timeOut: '05:00 PM', status: 'late' },
  { date: '2025-04-11', timeIn: '08:45 AM', timeOut: '05:15 PM', status: 'present' },
  { date: '2025-04-10', timeIn: '- -', timeOut: '- -', status: 'absent' },
];

enum AttendanceMode {
  CHECK_IN = 'check-in',
  CHECK_OUT = 'check-out',
}

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showFaceScanner, setShowFaceScanner] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState<AttendanceMode>(AttendanceMode.CHECK_IN);
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleMarkAttendance = (mode: AttendanceMode) => {
    setAttendanceMode(mode);
    setShowFaceScanner(true);
  };
  
  const handleFaceCapture = () => {
    setAttendanceStatus('processing');
    
    setTimeout(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setAttendanceStatus('success');
      setAttendanceTime(timeString);
      
      const actionText = attendanceMode === AttendanceMode.CHECK_IN ? 'Check-in' : 'Check-out';
      toast.success(`${actionText} successful at ${timeString}`);
    }, 1500);
  };
  
  const handleReset = () => {
    setShowFaceScanner(false);
    setAttendanceStatus('idle');
    setAttendanceTime(null);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
        <div className="flex items-center mt-2 text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>{today}</span>
          <Clock size={16} className="ml-4 mr-2" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {!showFaceScanner ? (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mark Your Attendance</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleMarkAttendance(AttendanceMode.CHECK_IN)}
                    className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Check In
                  </button>
                  <button
                    onClick={() => handleMarkAttendance(AttendanceMode.CHECK_OUT)}
                    className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {attendanceMode === AttendanceMode.CHECK_IN ? 'Check In' : 'Check Out'}
                  </h2>
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
                
                {attendanceStatus === 'success' ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {attendanceMode === AttendanceMode.CHECK_IN ? 'Checked In' : 'Checked Out'} Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your attendance has been recorded at {attendanceTime}
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">
                      Please look at the camera for face verification
                    </p>
                    <FaceScanner
                      onCapture={handleFaceCapture}
                      buttonText={attendanceStatus === 'processing' ? 'Verifying...' : 'Verify Face'}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              {user?.faceImage ? (
                <img
                  src={user.faceImage}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Today's Status:</span>
                <span className="text-green-600 font-medium">Present</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Check In:</span>
                <span>08:48 AM</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Check Out:</span>
                <span>Not checked out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <History size={20} className="mr-2 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Attendance History</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Check In
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Check Out
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAttendanceHistory.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timeIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timeOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.status === 'present' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Present
                        </span>
                      ) : record.status === 'late' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Late
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Absent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;