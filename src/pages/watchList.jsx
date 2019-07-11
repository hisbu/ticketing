import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import {ApiUrl} from './../support/urlApi'

class WatchList extends React.Component{
    state={
        movies:null
    }

    renderData=()=>{
        var data = this.props.user.watchList
        // var movies = this.state.movies
        // alert(typeof(data))
        Axios.get(ApiUrl+'/movies')
        .then((res)=>{
            // console.log(res.data)
            this.setState({movies: res.data})
            data.map((val)=>{
                return (
                    alert(val)
                )
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log('dari render page watchlist')
        // console.log(typeof(data))
        // var jsx = this.props.user.watchList.map((val,i)=>{
        //     return(
        //         movies.map((val1, index)=>{
        //             if(val === val1.id){
        //                 return console.log('ketemu')
        //             }
        //         })
        //     )
        // })
        // return jsx
    }

    render(){
        // this.renderData()
        // console.log('dari page watch list')
        // console.log(this.state.movies)
        return(
            <div>
                <h1>watch list</h1>
                {this.renderData}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(WatchList);