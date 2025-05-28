import React from 'react';
import { UsersRound, UserCheck, UserX, Clock, Calendar } from 'lucide-react';

interface AttendanceStatusCardProps {
  title: string;
  count: number;
  icon: 'total' | 'present' | 'absent' | 'late';
  trend?: string;
  trendDirection?: 'up' | 'down';
}

const AttendanceStatusCard: React.FC<AttendanceStatusCardProps> = ({
  title,
  count,
  icon,
  trend,
  trendDirection,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'total':
        return <UsersRound size={24} />;
      case 'present':
        return <UserCheck size={24} />;
      case 'absent':
        return <UserX size={24} />;
      case 'late':
        return <Clock size={24} />;
      default:
        return <Calendar size={24} />;
    }
  };

  const getIconColor = () => {
    switch (icon) {
      case 'total':
        return 'text-blue-600 bg-blue-100';
      case 'present':
        return 'text-green-600 bg-green-100';
      case 'absent':
        return 'text-red-600 bg-red-100';
      case 'late':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    if (icon === 'absent' || icon === 'late') {
      // For negative metrics
      return trendDirection === 'up' 
        ? 'text-red-600' 
        : 'text-green-600';
    } else {
      // For positive metrics
      return trendDirection === 'up' 
        ? 'text-green-600' 
        : 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-3xl font-semibold text-gray-900">{count}</p>
            {trend && (
              <p className={`ml-2 text-sm font-medium ${getTrendColor()}`}>
                {trendDirection === 'up' ? '↑' : '↓'} {trend}
              </p>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-full ${getIconColor()}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatusCard;