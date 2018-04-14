import React from 'react';
import PropTypes from 'prop-types';
import BOOK_STATUS from './../Config';
import { observer } from 'mobx-react';
import store from './../Store';

// Book Component
const Book = observer(
  class Book extends React.Component {
    static propTypes = {
      book: PropTypes.object.isRequired
    };

    /**
     * Change book's shelf while selecting an option
     * @param {string} shelf The shelf selected
     */
    onBookShelfChange = shelf => {
      const { book } = this.props;
      console.log(book);
      // if clicking on the current shelf, do nothing
      if (shelf !== book.shelf) {
        store.setBookShelf(book, shelf);
      }
    };

    render() {
      console.log('render');
      const { book, page } = this.props;
      // if this is a book in a search result
      if (!book.shelf) {
        // check if this book is already in our shelves
        const index = store.books.findIndex(b => b.id === book.id);
        // if it's in, set the shelf.
        if (index !== -1) {
          book.shelf = store.books[index].shelf;
        }
      }

      if (book.shelf === BOOK_STATUS.none) {
        book.shelf = '';
      }

      return (
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
              }}
            />
            {/* if this is search screen and it's already in our books, show this check mark. */}
            {page === 'search' &&
              book.shelf && <div className="book-checked-mark" />}
            <div className="book-shelf-changer">
              <select
                onChange={e => {
                  this.onBookShelfChange(e.target.value);
                }}
                defaultValue={book.shelf || BOOK_STATUS.none}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value={BOOK_STATUS.reading}>Currently Reading</option>
                <option value={BOOK_STATUS.want}>Want to Read</option>
                <option value={BOOK_STATUS.read}>Read</option>
                <option value={BOOK_STATUS.none}>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(' & ')}
          </div>
        </div>
      );
    }
  }
);

export default Book;
