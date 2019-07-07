import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlay, faInfo } from '@fortawesome/free-solid-svg-icons'
// import playBotton from './../support/play-button.svg'
import  ModalVideo from 'react-modal-video'
import { Paper } from '@material-ui/core'
import { Input, UncontrolledCarousel } from 'reactstrap'

const item = [
    {
        src : 'https://karasi.com/Gallery/Aladdin-Header-Karasi.jpg',
        alt : '2'
    },
    {
        src : 'http://www.universdescomics.com/wp-content/uploads/2019/06/Spider-Man-Far-From-Home-Banner.jpg',
        alt : '1'
    },
    {
        src : 'https://lumiere-a.akamaihd.net/v1/images/richbanner-toystory4_0026da28.jpeg?region=0,0,1920,1045&width=1200',
        alt : '3'
    }

]
class MovieList extends React.Component{
    state={
        data:[],
        modalThriller:false,
        id:0
    }

    openModalVideo = (id) => {
        this.setState({modalThriller: true})
        this.setState({id:(id-1)})
        // alert(typeof(id))
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
                <div className="col-md-3 mycard p-0 pb-3 ml-3 mb-3">
                    {/************MODAL VIDEO************/}
                    <ModalVideo channel='youtube' autoplay="1" isOpen={this.state.modalThriller} videoId={this.state.data[this.state.id].thriller} onClose={() => this.setState({modalThriller: false})} />
                    {/************MODAL VIDEO************/}
                        <img src={val.image} alt="" width="100%" className='movieImage' />
                        <div className="playbutton">
                            <div className='playIcon' onClick={()=>this.openModalVideo(val.id)}><FontAwesomeIcon icon={faPlay} /></div>
                        </div>
                        <div className="duration"><p>{val.duration}<span>min</span></p></div>
                        <Link to={'/movieDetail?id='+val.id}>
                            <div className="filmTitle">{val.title} </div>
                        </Link>
                        <civ className="sutradara">{val.sutradara}</civ>
                        <div className="genre"><p>{val.title}</p></div>
                        
                    </div>

            )
        })
        return jsx
    }
    render(){
        return(
            <div>
            <div className='banner'>
                <UncontrolledCarousel items = {item}/>
            </div>
            
            <div className="row mt-5 justify-content-center">
                {/* <div className="row justify-content-center">
                    <Paper className=' m-3 p-2 col-md-8'>
                    Filter by:
                    <Input type='select'>
                        <option value='genre'>Genre</option>
                        <option value='sutradara'>Sutradara</option>
                        <option value='playingAt'>Playing Time</option>
                    </Input>
                    

                    </Paper>
                </div> */}
                <Paper className='col-md-2 mr-2'></Paper>
                <Paper className='p-3 col-md-9 justify-content-center'>
                    <Paper style={{width:'93%', color:'grey', textAlign:'center'}} className='p-3 m-4'>Now Showing</Paper>
                <div className="row justify-content-center">
                   { this.printMovie()}
                </div>
                </Paper>
            </div>
            
            </div>
        )
    }
}

export default MovieList;