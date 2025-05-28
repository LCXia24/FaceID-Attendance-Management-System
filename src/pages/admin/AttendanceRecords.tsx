import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import AttendanceTable from '../../components/AttendanceTable';

// Mock data
const mockAttendanceRecords = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-04-24',
    timeIn: '09:02 AM',
    timeOut: '05:30 PM',
    status: 'present' as const,
    department: 'Engineering',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-04-24',
    timeIn: '09:47 AM',
    timeOut: '05:15 PM',
    status: 'late' as const,
    department: 'Marketing',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Robert Johnson',
    date: '2025-04-24',
    timeIn: '-',
    status: 'absent' as const,
    department: 'Finance',
  },
  {
    id: '4',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-04-24',
    timeIn: '08:55 AM',
    timeOut: '05:05 PM',
    status: 'present' as const,
    department: 'Engineering',
  },
  {
    id: '5',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-04-24',
    timeIn: '08:48 AM',
    timeOut: '05:30 PM',
    status: 'present' as const,
    department: 'Marketing',
  },
  {
    id: '6',
    employeeId: 'EMP003',
    employeeName: 'Robert Johnson',
    date: '2025-04-24',
    timeIn: '09:20 AM',
    timeOut: '05:15 PM',
    status: 'late' as const,
    department: 'Finance',
  },
  {
    id: '7',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-04-24',
    timeIn: '08:50 AM',
    timeOut: '05:10 PM',
    status: 'present' as const,
    department: 'Engineering',
  },
  {
    id: '8',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-04-24',
    timeIn: '-',
    status: 'absent' as const,
    department: 'Marketing',
  },
];

const AttendanceRecords: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('');
  
  const filteredRecords = dateFilter
    ? mockAttendanceRecords.filter((record) => record.date === dateFilter)
    : mockAttendanceRecords;
  
  const handleExportCSV = () => {
    alert('Wara pa hinen CSV');
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Attendance Records</h1>
        <p className="text-blue-700 mt-1">View and filter attendance records</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={18} className="text-blue-400" />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="block pl-10 pr-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download size={18} className="mr-2" />
          Export to CSV
        </button>
      </div>
      
      <AttendanceTable records={filteredRecords} />
    </div>
  );
};

export default AttendanceRecords;