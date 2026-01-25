import { useEffect, useState } from "react";
import employeeStore from "../stores/EmployeeStore";
import { addEmployee, removeEmployee } from "../actions/EmployeeActions";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees([...employeeStore.getAllEmployees()]);
  }, []);

  const refresh = () => {
    setEmployees([...employeeStore.getAllEmployees()]);
  };

  return (
    <div>
      <h2>Employee List</h2>

      <button onClick={() => {
        addEmployee("Reethu");
        refresh();
      }}>
        Add Employee
      </button>

      {employees.map((emp, index) => (
        <div key={index}>
          <span>{emp}</span>
          <button onClick={() => {
            removeEmployee(index);
            refresh();
          }}>
            ❌ Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;

