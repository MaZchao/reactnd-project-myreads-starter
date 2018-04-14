import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './../components/BookList';
import BOOK_STATUS from './../Config';
import store from './../Store';
import { observer } from 'mobx-react';

const HomeScreen = observer(
  class HomeScreen extends React.Component {
    render() {
      const { books, initialized } = store;

      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {/* If the app hasn't done its first requst, show a loading indicator */}
          {initialized ? (
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookList
                      books={books.filter(
                        book => book.shelf === BOOK_STATUS.reading
                      )}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookList
                      books={books.filter(
                        book => book.shelf === BOOK_STATUS.want
                      )}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookList
                      books={books.filter(
                        book => book.shelf === BOOK_STATUS.read
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="loading" />
          )}
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      );
    }
  }
);

export default HomeScreen;
