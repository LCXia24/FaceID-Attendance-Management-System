import { create } from 'zustand';
import axios from 'axios';

type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  faceImage: string;
};

type EmployeeStore = {
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  fetchEmployees: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      set({ employees: response.data });
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  },
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee]
    })),
  updateEmployee: (id, updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      )
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id)
    }))
}));
