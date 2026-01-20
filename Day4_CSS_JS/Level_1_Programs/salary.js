let employee = {

    calculateSalary: function () {

        let name = document.getElementById("ename").value;
        let days = parseInt(document.getElementById("days").value);
        let basic = parseFloat(document.getElementById("basic").value);
        let bonus = parseFloat(document.getElementById("bonus").value);

        // Gross salary
        let grossSalary = (days * basic) + bonus;

        // Tax deduction (10%)
        let tax = grossSalary * 0.10;

        // Net salary
        let netSalary = grossSalary - tax;

        document.getElementById("result").innerHTML =
            "Employee Name: " + name + "<br>" +
            "Gross Salary: ₹" + grossSalary + "<br>" +
            "Tax Deduction: ₹" + tax + "<br>" +
            "Net Salary: ₹" + netSalary;
    }
};
