import { observable, action, decorate } from 'mobx';

// A store that saves books array for multi components to operate
class Store {
  books = [];

  setBooks = books => {
    this.books = books;
  };
}

decorate(Store, {
  books: observable,
  setBooks: action
});

const store = new Store();

export default store;
