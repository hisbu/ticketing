import React from 'react'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faThumbsUp, faThumbsDown, faQuestion, faChair, faBookOpen, faVideo} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap';
import { Button } from '@material-ui/core';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import ReactDom from 'react-dom'
import  ModalVideo from 'react-modal-video'

class MovieDetail extends React.Component{
    state = {
        data:null,
        userLogin:true,
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
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    onBuyTicketClick =()=>{
        // alert(this.props.user.id)
        if(this.props.user.id===0){
            this.setState({userLogin:false})
        }
    }


    render(){
        if(this.state.userLogin === false){
            return(
                <Redirect to="/login"/>

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
                                <div className='buy mt-3' onClick={this.onBuyTicketClick}>Buy Ticket</div>
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
        user : state.user
    }
}
export default connect(mapStateToProps) (MovieDetail);