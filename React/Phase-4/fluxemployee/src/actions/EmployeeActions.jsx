import dispatcher from "../dispatcher/AppDispatcher";

export function addEmployee(employeeName) {
  dispatcher.dispatch({
    type: "ADD_EMPLOYEE",
    payload: employeeName
  });
}

export function removeEmployee(index) {
  dispatcher.dispatch({
    type: "REMOVE_EMPLOYEE",
    payload: index
  });
}

