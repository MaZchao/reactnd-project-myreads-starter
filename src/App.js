import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import store from './Store';
import './App.css';

class BooksApp extends React.Component {
  componentDidMount() {
    // Get all books and save to mobx store
    BooksAPI.getAll()
      .then(books => {
        store.setBooks(books);
      })
      .catch(() => {
        alert('Internet error, cannot get books');
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/" exact component={HomeScreen} />
          <Route path="/search" component={SearchScreen} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
