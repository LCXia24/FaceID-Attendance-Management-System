import React from 'react';
import { User, Edit, Trash } from 'lucide-react';

interface EmployeeCardProps {
  id: string;
  name: string;
  email: string;
  position?: string;
  department?: string;
  faceImage?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  name,
  email,
  position = 'Employee',
  department = 'General',
  faceImage,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start">
          {faceImage ? (
            <img
              src={faceImage}
              alt={name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
              <User size={32} />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 truncate">{name}</h2>
            <p className="text-sm text-gray-500 truncate">{email}</p>
            <div className="mt-1 flex items-center">
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-200 text-blue-900 rounded-full">
                {position}
              </span>
              <span className="inline-block ml-2 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                {department}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-blue-200 bg-blue-50 px-4 py-3 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(id)}
          className="p-2 text-blue-700 hover:bg-blue-100 rounded-full transition-colors"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;