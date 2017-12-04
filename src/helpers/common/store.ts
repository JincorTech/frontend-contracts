import { Employee } from '../../redux/modules/employmentAgreement/employmentAgreement';

export const getEmployeeById = (employees: Employee[], id: string): Employee => {
  return employees.find((employee) => employee.id === id);
};
