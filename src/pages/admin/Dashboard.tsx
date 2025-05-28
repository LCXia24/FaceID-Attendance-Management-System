import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import AttendanceStatusCard from '../../components/AttendanceStatusCard';
import AttendanceTable from '../../components/AttendanceTable';
import axios from 'axios';

type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  timeIn: string | undefined;
  timeOut: string | undefined;
  status: 'present' | 'absent' | 'late';
  department: string;
};

type AttendanceStats = {
  title: string;
  count: number;
  icon: string;
  trend: string;
  trendDirection: 'up' | 'down';
};

const AdminDashboard: React.FC = () => {
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const recordsResponse = await axios.get('http://localhost:5000/api/attendances');
        const records: AttendanceRecord[] = recordsResponse.data.map((rec: any) => ({
          id: rec._id,
          employeeId: rec.employeeId._id,
          employeeName: rec.employeeId.name,
          date: new Date(rec.date).toLocaleDateString(),
          timeIn: rec.timeIn || '-',
          timeOut: rec.timeOut || '-',
          status: rec.status,
          department: rec.department,
        }));
        setAttendanceRecords(records);

        // Calculate stats
        const totalEmployees = new Set(records.map(r => r.employeeId)).size;
        const presentToday = records.filter(r => r.status === 'present').length;
        const absentToday = records.filter(r => r.status === 'absent').length;
        const lateToday = records.filter(r => r.status === 'late').length;

        setAttendanceStats([
          { title: 'Total Employees', count: totalEmployees, icon: 'total', trend: '0', trendDirection: 'up' },
          { title: 'Present Today', count: presentToday, icon: 'present', trend: '0', trendDirection: 'up' },
          { title: 'Absent Today', count: absentToday, icon: 'absent', trend: '0', trendDirection: 'down' },
          { title: 'Late Today', count: lateToday, icon: 'late', trend: '0', trendDirection: 'down' },
        ]);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
        <div className="flex items-center mt-2 text-blue-700">
          <Calendar size={16} className="mr-2 text-blue-600" />
          <span>{today}</span>
          <Clock size={16} className="ml-4 mr-2 text-blue-600" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {attendanceStats.map((stat, index) => (
          <AttendanceStatusCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon as any}
            trend={stat.trend}
            trendDirection={stat.trendDirection}
          />
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Today's Attendance</h2>
          <button 
            onClick={() => window.location.href = '/admin/attendance'}
            className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            View all
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        
        <AttendanceTable records={attendanceRecords} />
      </div>
    </div>
  );
};

export default AdminDashboard;
