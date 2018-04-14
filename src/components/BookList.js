import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  static defaultProps = {
    books: []
  };

  render() {
    const { books } = this.props;

    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.title}>
            <Book onBookStatusChange={this.onBookStatusChanged} book={book} />
          </li>
        ))}
      </ol>
    );
  }
}

export default BookList;
