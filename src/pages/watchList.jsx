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
        // alert(typeof(data))
        Axios.get(ApiUrl+'/movies')
        .then((res)=>{
            // console.log(res.data)
            this.setState({movies: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
        
       for(var i = 0 ; i<data.length;i++){
           for(var j = 0; j<this.state.movies.length; j++){
               if(data[i]==this.state.movies.id[j]){
                   console.log('sama'+ data[i], this.state.movies.id[j])
               }else{
                   console.log('ga nemu')
               }
               console.log('didalam if')
               console.log(data[i])
                console.log(this.state.movies.id[j])
           }
       }
    }

    render(){
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