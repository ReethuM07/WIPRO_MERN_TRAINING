import Dispatcher from "./AppDispatcher";

class BookStore {
  constructor() {
    this.books = [];
    this.listeners = [];

    Dispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    if (action.type === "ADD_BOOK") {
      this.books.push(action.payload);
      this.emitChange();
    }
  }

  getBooks() {
    return this.books;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  emitChange() {
    this.listeners.forEach(l => l());
  }
}

export default BookStore;
