import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
// import Footer from './components/footer'
import { Route } from 'react-router-dom'
import MovieList from './pages/movieList'
import MovieDetail from './pages/movieDetail'
import ManageMovie from './pages/admin/manageMovie'
import Register from './pages/register'
import LoginPage from './pages/login'
import Reservation from './pages/seatReservation'
import FilterList from './components/filterList'
import Filter from './components/filter'
import Axios from 'axios';
import {ApiUrl} from './support/urlApi'
import { OnRegisterSuccess } from './redux/actions'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount(){
    var username = localStorage.getItem('userLogin')
    if(username !== null){
      Axios.get(ApiUrl+'/user?username='+ username)
      .then((res) => {
        console.log(res.data)
        this.props.OnRegisterSuccess(res.data[0])
      })
      .catch((err)=>{
        console.log(err)
      })
    }
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
        <Route path='/' component={MovieList} exact/>
        <Route path='/movieDetail' component={MovieDetail}/>
        <Route path='/manageMovie' component={ManageMovie}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/filterList' component={FilterList}/>
        <Route path='/filter' component={Filter}/>
        <Route path='/reservation' component={Reservation}/>
        {/* <Footer/> */}
      </div>
    );
  }

  }

  const mapStateToProps  = (state) =>{
    return{
      user : state.user.username
    }
  }


export default connect(mapStateToProps, {OnRegisterSuccess}) (App);
