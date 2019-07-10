import React from 'react'
import {Button} from 'reactstrap'
import { Paper} from '@material-ui/core'
import Numeral from 'numeral'
import Axios from 'axios';
import { ApiUrl } from './../support/urlApi'
import PageNotFount from './../pages/PagesNotFound'
import { connect } from 'react-redux'

class Reservation extends React.Component{
    state={
        seat : 80,
        baris : 4,
        booked : [[2,4],[3,5]],
        chosen : []
    }

    getDataApi=()=>{
        var seat=this.state.seat
        var booked = this.state.booked
        
        Axios.get(ApiUrl+'/movies?id=')
    }

    

    renderSeat=()=>{
        var {seats, booked} = this.props.location.state
        var arr=[]
        for(var i = 0; i< seats/20;i++){
            var arrtmp=[]
            for(var j=0;j<seats/(seats/20);j++){
                arrtmp.push(1)
            }
            arr.push(arrtmp)
        }

        for(var i = 0 ; i< booked.length;i++){
            arr[booked[i][0]][booked[i][1]]=2
        }

        for(var i = 0 ; i< this.state.chosen.length;i++){
            arr[this.state.chosen[i][0]][this.state.chosen[i][1]]=3
        }
        var charCodeRange={
            start:65,
            end:68
        }
        var jsx = arr.map((val, index)=>{
            return(
                
                <tr align='center'>
                    {
                        val.map((val1,i)=>{
                            if(val1 === 2){
                                return(
                                    // <input type='button' value={String.fromCharCode(index+65)+ (i+1)} className='mr-2 mt-2 bg-danger disabled'/>
                                    <Button  disabled color='danger'className='mr-1 mb-1'>{(i+1) + String.fromCharCode(index+65)}</Button>
                                )
                            }if(val1 === 3){
                                return(
                                    // <input type='button' value={String.fromCharCode(index+65)+ (i+1)} className='mr-2 mt-2 bg-danger disabled'/>
                                    <Button onClick={()=>this.onBtnChosenClick([index,i])}  color='secondary'className='mr-1 mb-1'>{(i+1) + String.fromCharCode(index+65)}</Button>
                                )
                            }
                            return(
                                // <input type='button' value={String.fromCharCode(index+65)+ (i+1)} className='mr-2 mt-2'/>
                                <Button onClick={()=>this.onBtnSeatClick([index, i])} color='success' className='mr-1 mb-1'>{(i+1) + String.fromCharCode(index+65)}</Button>
                            )
                            
                        })
                    }
                </tr>
            )
        })
        // console.log(arr)
        return jsx
       

    }

    onBtnSeatClick=(index)=>{
        
        var chosen = this.state.chosen
        chosen.push(index)
        this.setState({chosen:chosen})
        // console.log(this.state.chosen)
        // console.log(index)

        


    }

    

    onBtnChosenClick=(arr)=>{

        var chosen = this.state.chosen
        var hasil = chosen.filter((val)=>{
            return val.join('') !== arr.join('')
        })

        this.setState({chosen:hasil})

    }

    onBtnBuyClick=()=>{
        var transaction = this.props.transaction
        //post ke movie
        if(this.state.chosen.length !== 0){
            var booked = this.props.location.state.booked
            var arr = [...booked, ...this.state.chosen]
            Axios.patch(ApiUrl + '/movies/'+this.props.location.state.id, {booked : arr})
            .then((res)=>{
                console.log(res.data)
                var obj = {
                    title : this.props.location.state.title,
                    qty : this.state.chosen.length,
                    total : this.state.chosen.length*35000
                }

                transaction.push(obj)
                Axios.patch(ApiUrl +'/user/'+ this.props.id, {transaction : transaction})
                .then((res)=>{
                    alert('masuk')
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        //post ke users

    }
    render(){
        console.log(this.props.location.state)
        if(this.props.location.state===undefined){
            return(
                <PageNotFount/>
            )
        }
        
        return(
            <div>
            <div className='container mt-5 md-5 justify-content-center'>
                <h1 style={{textAlign:'center'}}>{this.props.location.state.title}</h1>
                <table>
                    {this.renderSeat()}
                </table>
                <div style={{backgroundColor:"white", width:'100%', height:'30px', border:'2px solid black', textAlign:"center",
            fontWeight:'bold'}}className='mt-3'>Layar Bioskop</div>
                {/* {
                    this.state.chosen.length===0
                    ?
                    null:
                    <div className='mt-5'> Total Bayar : Rp. {Numeral(this.state.chosen.length * 35000).format(0,0)}</div>
                } */}
                
            </div>
            <div className='row justify-content-center mt-5 p-3' style={{backgroundColor:'', color:'black'}}>
                <div className='col-md-1 '>
                    <img src={this.props.location.state.image} alt="" width='100%'/>
                </div>
                <div className='col-md-3 '>
                    <p>{this.props.location.state.title}</p>
                    <p>{this.props.location.state.duration}</p>
                    <p>{this.props.location.state.genre}</p>
                    <p>{this.props.location.state.sutradara}</p>
                </div>
                <div className='col-md-3 '>
                    <p><b>Seat : {this.state.chosen.length}</b></p>
                    {/* {this.state.chosen.map=(val, index)=>{return <p>{index}</p>}} */}
                </div>
                <div className='col-md-3 '>
                {
                    this.state.chosen.length===0
                    ?
                    null:
                    <div> Total Bayar : Rp. {Numeral(this.state.chosen.length * 35000).format(0,0)}</div>
                }
                <Button onClick={this.onBtnBuyClick} color='primary' width='100%' className='mt-3 pr-5 pl-5'>BUY</Button>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps=( state )=>{
    return{
        id: state.user.id,
        transaction : state.user.transaction
    }
}

export default connect(mapStateToProps) (Reservation);