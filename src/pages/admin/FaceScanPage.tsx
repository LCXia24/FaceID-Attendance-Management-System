import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Camera, CheckCircle2 } from 'lucide-react';
import FaceScanner from '../../components/FaceScanner';

import { useEmployeeStore } from '../../stores/employeeStore';

const FaceScanPage: React.FC = () => {
  const { employees } = useEmployeeStore();
  const [selectedEmployee, setSelectedEmployee] = useState<null | {
    id: string;
    name: string;
    email: string;
    confidence?: number;
  }>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [password, setPassword] = useState('');
  
  const handleFaceCapture = () => {
    setTimeout(() => {
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      const confidence = 85 + Math.floor(Math.random() * 15);
      
      setSelectedEmployee({
        id: randomEmployee.id,
        name: randomEmployee.name,
        email: randomEmployee.email,
        confidence
      });
    }, 1500);
  };
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast.error('Please enter your password');
      return;
    }
    
    setTimeout(() => {
      setScanComplete(true);
      
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      toast.success(`Attendance recorded for ${selectedEmployee?.name} at ${timeString}`);
    }, 1000);
  };
  
  const handleReset = () => {
    setSelectedEmployee(null);
    setScanComplete(false);
    setPassword('');
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Face Recognition Attendance</h1>
        <p className="text-blue-700 mt-1">
          Scan employee faces to mark attendance
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {scanComplete ? (
          <div className="p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              Attendance Recorded!
            </h2>
            
            <p className="text-blue-700 mb-6">
              {selectedEmployee?.name}'s attendance has been successfully recorded.
            </p>
            
            <div className="text-sm bg-blue-50 p-4 rounded-md inline-block mb-6">
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p>
                <strong>Status:</strong> <span className="text-green-600 font-medium">Present</span>
              </p>
            </div>
            
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              Scan Another
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">
                    <Camera size={20} className="inline-block mr-2 text-blue-600" />
                    Face Scanner
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Position the employee's face in the frame
                  </p>
                </div>
                
                <FaceScanner onCapture={handleFaceCapture} buttonText="Recognize Face" />
              </div>
              
              <div className="w-full md:w-1/2">
                {selectedEmployee ? (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-blue-900 mb-2">
                        Employee Identified
                      </h3>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                            {selectedEmployee.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xl font-medium text-blue-900">
                              {selectedEmployee.name}
                            </h4>
                            <p className="text-blue-700">{selectedEmployee.email}</p>
                            <div className="mt-1 text-xs">
                              <span className="text-green-600 font-medium">
                                {selectedEmployee.confidence}% match
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <form onSubmit={handleVerify}>
                          <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">
                              Verify with Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>
                          
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={handleReset}
                              className="px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                            >
                              Clear
                            </button>
                            
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                            >
                              Verify & Record
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="mb-4 text-blue-400">
                        <Camera size={64} className="mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-blue-900 mb-2">
                        No Face Detected
                      </h3>
                      <p className="text-blue-700 text-sm">
                        Click "Recognize Face" to scan for an employee
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceScanPage;