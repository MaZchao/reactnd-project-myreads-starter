import { observable, action, decorate } from 'mobx';
import { update } from './BooksAPI';

// A store that saves books array for multi components to operate
class Store {
  books = [];

  setBooks = books => {
    this.books = books;
  };

  setBookStatus = (book, status) => {
    
  }
}

decorate(Store, {
  books: observable,
  setBooks: action
});

const store = new Store();

export default store;
