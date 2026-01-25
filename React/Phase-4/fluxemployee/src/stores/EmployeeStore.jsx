import dispatcher from "../dispatcher/AppDispatcher";

let _employees = [];

const EmployeeStore = {
  getAllEmployees() {
    return _employees;
  }
};

dispatcher.register((action) => {
  switch (action.type) {

    case "ADD_EMPLOYEE":
      _employees.push(action.payload);
      break;

    case "REMOVE_EMPLOYEE":
      _employees.splice(action.payload, 1);
      break;

    default:
      break;
  }
});

export default EmployeeStore;

