import React from 'react'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faThumbsUp, faThumbsDown, faQuestion, faChair, faBookOpen, faVideo, faHeart} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap';
// import { Button } from '@material-ui/core';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
// import ReactDom from 'react-dom'
import  ModalVideo from 'react-modal-video'
import { fromLoginPage, filmId} from './../redux/actions'
import { ApiUrl } from '../support/urlApi';


class MovieDetail extends React.Component{
    state = {
        data:null,
        userLogin:null,
        isOpen: false
    }

    openModalVideo = () => {
        this.setState({isOpen: true})
    }

    componentDidMount = () =>{
        var id = this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/'+id)
        .then((res) => {
            console.log(res.data)
            this.setState({data:res.data})
            if(this.props.user.watchList.includes(res.data.id)){
                document.getElementsById('heart').style.color="blue"
            }
        })
        .catch((err)=>{
            console.log(err)
        })

        
        
    }

    onBuyTicketClick =(filmId)=>{
        // alert(filmId)
        if(this.props.user.id===0){
            this.setState({userLogin:false})
       
        }else{
            this.setState({userLogin: true})
        }
        
    }

    onBtnWatchList=()=>{
        var watchList = []
        var filmId = this.props.location.search.split('=')[1]
        var userId=this.props.user.id
        // alert(filmId)
        Axios.get(ApiUrl+'/user/'+userId)
        .then((res)=>{
            console.log(res.data.watchList)
            var data=res.data.watchList
            var arr=data.concat()
            watchList.concat(data)
            if(data.length!==0){
                if(!arr.includes(filmId)){
                    // arr.push(filmId)
                    Axios.patch(ApiUrl+'/user/'+userId, {watchList: [...arr, ...filmId]})
                    .then((res)=>{
                        console.log('if beda')
                        console.log(res.data)
                        alert('Film '+ this.state.data.title +' berhasil ditambahkan kedalam daftar Watch list')
                       
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }else{
                    data.map((val, i)=>{
                            if(val===filmId){
                                var dataSplice = data
                                dataSplice.splice(i, 1)
                                Axios.patch(ApiUrl+'/user/'+userId, {watchList: dataSplice})
                                .then((res)=>{
                                    console.log('if sama')
                                    console.log(res.data)
                                    alert('Film '+ this.state.data.title +' berhasil dihapus dari daftar Watch list')
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            }
                        })

                }
            }else{
                arr.push(filmId)
                Axios.patch(ApiUrl+'/user/'+userId, {watchList: [filmId]})
                .then((res)=>{
                    console.log('if data kosong')
                    console.log(res.data)
                    alert('Film '+ this.state.data.title +' berhasil ditambahkan kedalam daftar Watch list')
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        

    }


    render(){
        
        if(this.state.userLogin === false ){
            return(
                <Redirect to="/login"/>

            )
        }

        if(this.state.userLogin===true){
            return(
                <Redirect to={{ pathname : '/reservation', state: this.state.data}}/>
            )
        }
  
        if(this.state.data === null){
            return (
                <center className='mt-5'> 
                <div>
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="warning" />
                    <Spinner type="grow" color="info" />
                    <Spinner type="grow" color="light" />
                    <Spinner type="grow" color="dark" />
                </div>

                </center>
            )
        }
        return(
            <div className="">
                <div className="bgVideo" >
                    
                    <iframe width="100%" height="400" title="triler" src={'https://www.youtube.com/embed/'+this.state.data.thriller} frameborder="0" controls="0" allowfullscreen></iframe>
                </div>
                <div className="playVideo" onClick={this.openModalVideo}></div>
                {/************MODAL VIDEO************/}

                <ModalVideo channel='youtube' autoplay="1" isOpen={this.state.isOpen} videoId={this.state.data.thriller} onClose={() => this.setState({isOpen: false})} />
                
                {/************MODAL VIDEO************/}
                <div className="container  content">
                    <div className="">
                        <div className="row ">
                            <div className='col-md-3  imageDetail ' >
                                <img src={this.state.data.image} alt="" width/>
                                <div className='heart' id='heart' onClick={this.onBtnWatchList}><FontAwesomeIcon icon={faHeart}/></div>
                                <div className='buy mt-3' onClick={()=>this.onBuyTicketClick(this.state.data.id)}>Buy Ticket</div>
                            </div>
                            <div className='col-md-9 '>
                                <div className="contentBox">
                                    <div className="titleDetail">{this.state.data.title}{this.props.user.id}</div>
                                    <div className="sutradaraDetail">{this.state.data.sutradara}</div>
                                    <div className="genreDetailDiv"><span className="genreDetail">{this.state.data.genre}</span></div>
                                    <div className="timeDetail"><FontAwesomeIcon icon={faVideo}/> {this.state.data.playingAt.join(',')}  |  <FontAwesomeIcon icon={faClock}/>{this.state.data.duration} min</div>
                                    <div className="voteDetail  d-flex col-md-12">
                                        <div className="thumbsContainer col-md-2 ml-2">
                                            <div className="thumbsDetail "><FontAwesomeIcon icon={faThumbsUp}/><span>73%</span></div>
                                            <div className="voteSUm">41 votes</div>
                                        </div>
                                        <div className="col-md-3 ml-2 will"><FontAwesomeIcon icon={faThumbsUp}/>  WWILL WATCH (31)</div>
                                        <div className="col-md-3 ml-2 maybe "><FontAwesomeIcon icon={faQuestion}/>  MAYBE (31)</div>
                                        <div className="col-md-3 ml-2 wont "><FontAwesomeIcon icon={faThumbsDown}/>  WON'T WATCH (31)</div>
                                    </div>
                                    <div className='tabsDetail col-md-12  d-flex align-content-center'>
                                        <div className='liTabs '>Summary</div>
                                        <div className='liTabs'>User Reviews</div>
                                        <div className='liTabs'>Critic Reviews</div>
                                    </div>
                                    <div className="contentTitle">SYNOPSIS</div>
                                    <div className="textDetail">
                                    {this.state.data.synopsis}
                                    </div>
                                    <div className="sutradaraDetail"><FontAwesomeIcon icon={faChair}/>  Director : Gina S. Noer</div> 
                                    <div className="sutradaraDetail"><FontAwesomeIcon icon={faBookOpen}/>  Writer : Gina S. Noer</div> 
                                </div>
                            </div>
                        </div>

                    {/* <div className="foother"><footer>footer</footer></div> */}
                    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.user,
       
        
    }
}

// const mapStateToProps2 = (data)=>{
//     return{
//         status: data.status.login,
//         filmId: data.status.filmId
//     }
// }
export default connect(mapStateToProps, {fromLoginPage, filmId}) (MovieDetail);