import { create } from 'zustand';

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
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [
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
  ],
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