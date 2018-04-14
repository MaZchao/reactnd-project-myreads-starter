import { observable, action, decorate } from 'mobx';
import BOOK_STATUS from './Config';
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
        const index = this.books.findIndex(b => b.id === book.id);
        console.log(index);
        if (index === -1 && shelf !== BOOK_STATUS.none) {
          this.books.push(book);
        }
        // if it's about deleting this book
        if (shelf === BOOK_STATUS.none) {
          this.books = this.books.filter(b => b.id !== book.id);
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
