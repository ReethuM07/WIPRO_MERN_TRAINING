import React from "react";
import Employee from "./Employee";

function EmployeeList() {
  const employees = [
    { id: 1, name: "Reethu", role: "Full Stack Developer" },
    { id: 2, name: "Yathin", role: "Front End Developer" },
    { id: 3, name: "Riya", role: "Tester" },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {employees.map((emp) => (
        <Employee
          key={emp.id}
          name={emp.name}
          role={emp.role}
        />
      ))}
    </div>

  );
}

export default EmployeeList;
