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
      const { book, page } = this.props;
      // if clicking on the current shelf, do nothing
      if (shelf !== book.shelf) {
        store.setBookShelf(book, shelf).then(() => {
          /*
           * Using this forceUpdate is because sometimes i set the book's shelf to none
           * in search screen and the related Book component doesn't seem to re-render.
           * So i have to manully update this (don't know why though....)
           */
          if (page === 'search') {
            this.forceUpdate();
          }
        });
      }
    };

    render() {
      const { book, page } = this.props;
      const storeBooks = store.books;
      // if this is a book in a search result
      if (!book.shelf) {
        // check if this book is already in our shelves
        const index = storeBooks.findIndex(b => b.id === book.id);
        // if it's in, set the shelf.
        if (index !== -1) {
          book.shelf = storeBooks[index].shelf;
        }
      }

      return (
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks &&
                  book.imageLinks.thumbnail})`
              }}
            />
            {/* if this is search screen and it's already in our books, show this check mark. */}
            {page === 'search' &&
              book.shelf && book.shelf !== BOOK_STATUS.none && <div className="book-checked-mark" />}
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
