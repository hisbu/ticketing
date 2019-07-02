import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import { Route } from 'react-router-dom'
import MovieList from './pages/movieList'
import MovieDetail from './pages/movieDetail'
import ManageMovie from './pages/admin/manageMovie'

class App extends React.Component {
  render(){
    return (
      <div>
        <Header/>
        <Route path='/' component={MovieList} exact/>
        <Route path='/movieDetail' component={MovieDetail}/>
        <Route path='/manageMovie' component={ManageMovie}/>
      </div>
    );
  }

  }

export default App;
