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
      // if clicking on the current shelf, do nothing
      if (shelf !== book.shelf) {
        store.setBookShelf(book, shelf);
      }
    };

    render() {
      const { book } = this.props;

      // if this is a book in a search result
      if (!book.shelf) {
        // check if this book is already in our shelves
        const index = store.books.findIndex(b => b.id === book.id);
        // if it's in, set the shelf.
        if (index !== -1) {
          book.shelf = store.books[index].shelf;
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
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={e => {
                  this.onBookShelfChange(e.target.value);
                }}
                defaultValue={book.shelf || 'none'}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
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
