import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import BookList from './../components/BookList';
import * as BooksAPI from './../BooksAPI';

class SearchSreen extends React.Component {
  state = {
    searchResult: [],
    query: '',
    msg: ''
  };

  // On input change state
  onInput = e => {
    this.setState(
      {
        query: e.target.value
      },
      this.throttledSearch
    );
  };

  /**
   * Search function, using throttle to prevent request happening too fast.
   */
  throttledSearch = _.throttle(() => {
    if (!this.state.query) return;
    BooksAPI.search(this.state.query)
      .then(res => {
        if (Array.isArray(res) && res.length > 0) {
          this.setState({
            msg: '',
            searchResult: res
          });
        } else {
          this.setState({
            msg: 'Nothing found',
            searchResult: []
          });
        }
      })
      .catch(() => {
        alert('Internet error, search failed');
      });
  }, 500, true);

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.onInput}
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {this.state.msg ? (
          // if search returns nothing, show this
          <div className="search-books-results">
            <p>{this.state.msg}</p>
          </div>
        ) : (
          <div className="search-books-results">
            <BookList page="search" books={this.state.searchResult} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchSreen;
