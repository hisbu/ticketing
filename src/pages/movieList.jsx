import React from 'react'
import Axios from 'axios'


class MovieList extends React.Component{
    state={
        data:[]
    }

    componentDidMount(){
        this.getDataMovie()

    }

    getDataMovie=()=>{
        Axios.get('http://localhost:2000/movies')
        .then((res)=>{
            console.log(res.data)
            this.setState({data: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    printMovie = () => {
        var jsx = this.state.data.map((val) => {
            return(
                <div className="col-md-3 mycard p-0 pb-3 ml-2 mr-2 mb-3">
                        <img src={val.image} alt="" width="100%"/>
                        <div className="duration"><p>{val.duration}m</p></div>
                        <div className="filmTitle">{val.title} </div>
                        <div className="genre"><p>{val.title}</p></div>
                    </div>

            )
        })
        return jsx
    }
    render(){
        return(
            <div className="container mt-5">
                <div className="row justify-content-center">
                   { this.printMovie()}
                </div>
            </div>
        )
    }
}

export default MovieList;