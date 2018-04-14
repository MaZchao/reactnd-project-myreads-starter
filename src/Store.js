import { observable, action, decorate } from 'mobx';
import { update } from './BooksAPI';

// A store that saves books array for multi components to operate
class Store {
  books = [];
  initialized = false;

  /**
   * Set books
   */
  setBooks = books => {
    this.books = books;
    if (!this.initialized) {
      this.initialized = true;
    }
  };

  /**
   * Set book shelf
   */
  setBookShelf = (book, shelf) => {
    update(book, shelf)
      .then(res => {
        book.shelf = shelf;
        // if this is a new book
        if (!this.books.includes(book)) {
          this.books.push(book);
        }
      })
      .catch(() => {
        alert('Internet error, set bok shelf failed');
      });
  };
}

decorate(Store, {
  books: observable,
  initialized: observable,
  setBooks: action,
  setBookShelf: action
});

const store = new Store();

export default store;
