import React, { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import EmployeeCard from '../../components/EmployeeCard';
import FaceScanner from '../../components/FaceScanner';
import { toast } from 'react-toastify';

// Mock employee data
const initialEmployees = [
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    position: 'Software Developer',
    department: 'Engineering',
    faceImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'UI Designer',
    department: 'Design',
    faceImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Michael Wilson',
    email: 'michael@example.com',
    position: 'Project Manager',
    department: 'Management',
    faceImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily@example.com',
    position: 'Marketing Specialist',
    department: 'Marketing',
    faceImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [showFaceScanner, setShowFaceScanner] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    faceImage: ''
  });

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.error('Name and email are required');
      return;
    }

    if (!newEmployee.faceImage) {
      toast.error('Face image is required for attendance verification');
      return;
    }

    const newEmployeeWithId = {
      ...newEmployee,
      id: Date.now().toString(),
    };

    setEmployees([...employees, newEmployeeWithId]);
    setNewEmployee({
      name: '',
      email: '',
      position: '',
      department: '',
      faceImage: ''
    });

    setIsAddingEmployee(false);
    setShowFaceScanner(false);
    toast.success('Employee added successfully');
  };

  const handleFaceCapture = (imageSrc: string) => {
    setNewEmployee({ ...newEmployee, faceImage: imageSrc });
    setShowFaceScanner(false);
  };

const handleEditEmployee = (id: string) => {
  const employeeToEdit = employees.find(emp => emp.id === id);
  if (!employeeToEdit) {
    toast.error('Employee not found');
    return;
  }

  setNewEmployee({
    name: employeeToEdit.name,
    email: employeeToEdit.email,
    position: employeeToEdit.position,
    department: employeeToEdit.department,
    faceImage: employeeToEdit.faceImage
  });

  setIsAddingEmployee(true);
  
  // Remove the old employee and add the updated one when saving
  const handleSave = () => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...newEmployee, id } : emp
    ));
    setIsAddingEmployee(false);
    toast.success('Employee updated successfully');
  };
};

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    toast.success('Employee deleted successfully');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Employee Management</h1>
        <p className="text-blue-700 mt-1">Add, edit and manage employee information</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          onClick={() => setIsAddingEmployee(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          <UserPlus size={18} className="mr-2" />
          Add Employee
        </button>
      </div>

      {isAddingEmployee ? (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Employee</h2>
          
          {showFaceScanner ? (
            <div>
              <p className="text-gray-600 mb-4">Please capture the employee's face for attendance verification</p>
              <FaceScanner onCapture={handleFaceCapture} />
              <div className="mt-4">
                <button
                  onClick={() => setShowFaceScanner(false)}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={newEmployee.position}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={newEmployee.department}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Face Image *
                </label>
                {newEmployee.faceImage ? (
                  <div className="flex items-center">
                    <img
                      src={newEmployee.faceImage}
                      alt="Captured face"
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <button
                      onClick={() => setShowFaceScanner(true)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Recapture
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFaceScanner(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Capture Face Image
                  </button>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddingEmployee(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Employee
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              id={employee.id}
              name={employee.name}
              email={employee.email}
              position={employee.position}
              department={employee.department}
              faceImage={employee.faceImage}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
            />
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-gray-500">
            No employees found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;