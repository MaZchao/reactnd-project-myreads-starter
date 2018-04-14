import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    page: PropTypes.string
  };

  static defaultProps = {
    books: [],
    page: ''
  };

  render() {
    const { books, page } = this.props;

    // if there are no books, show this message (not on search screen)
    if (books.length === 0 && page !== 'search') {
      return (
        <div>
          <p>There are no books on this shelf!</p>
          <Link to="/search">Go and add one</Link>
        </div>
      );
    }
    // normal look
    return (
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={`${book.id}`}>
            <Book onBookStatusChange={this.onBookStatusChanged} book={book} />
          </li>
        ))}
      </ol>
    );
  }
}

export default BookList;
