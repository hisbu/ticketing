import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
// import Footer from './components/footer'
import { Route, Switch } from 'react-router-dom'
import MovieList from './pages/movieList'
import MovieDetail from './pages/movieDetail'
import ManageMovie from './pages/admin/manageMovie'
import Register from './pages/register'
import LoginPage from './pages/login'
import Reservation from './pages/seatReservation'
import Filter from './components/filter'
import Axios from 'axios';
import {ApiUrl} from './support/urlApi'
import { OnRegisterSuccess } from './redux/actions'
import { connect } from 'react-redux'
import NotFount from './pages/PagesNotFound'
import WatchList from './pages/watchList'
import Cart from './pages/cart'

class App extends React.Component {

  componentDidMount(){
    var username = localStorage.getItem('userLogin')
    if(username !== null){
      Axios.get(ApiUrl+'/user?username='+ username)
      .then((res) => {
        // console.log(res.data)
        this.props.OnRegisterSuccess(res.data[0])
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    console.log(this.props.data)
  }
  render(){
    // if(this.props.user === '' && localStorage.get('userLogin')!== null){
    //   return(
    //     <p>loading</p>
    //   )
    // }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/' component={MovieList} exact/>
          <Route path='/movieDetail' component={MovieDetail}/>
          <Route path='/manageMovie' component={ManageMovie}/>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/filter' component={Filter}/>
          <Route path='/reservation' component={Reservation}/>
          <Route path='/watchList' component={WatchList}/>
          <Route path='/cart' component={Cart}/>
          <Route path='*' component={NotFount}/>
        </Switch>
        
      </div>
    );
  }

  }

  const mapStateToProps  = (state) =>{
    return{
      user : state.user.username,
      data : state.user
    }
  }


export default connect(mapStateToProps, {OnRegisterSuccess}) (App);
