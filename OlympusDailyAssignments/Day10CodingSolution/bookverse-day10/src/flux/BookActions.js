import Dispatcher from "./AppDispatcher";

export const addBook = (book) => {
  Dispatcher.dispatch({
    type: "ADD_BOOK",
    payload: book
  });
};
