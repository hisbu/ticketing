import React from 'react'
import {Button} from 'reactstrap'
import { Paper} from '@material-ui/core'


class Reservation extends React.Component{
    state={
        seat : 80,
        baris : 4,
        booked : [[2,4],[3,5]]
    }

    renderSeat=()=>{
        var arr=[]
        for(var i = 0; i<this.state.baris;i++){
            var arrtmp=[]
            for(var j=0;j<this.state.seat/this.state.baris;j++){
                arrtmp.push(true)
            }
            arr.push(arrtmp)
        }

        for(var i = 0 ; i< this.state.booked.length;i++){
            arr[this.state.booked[i][0]][this.state.booked[i][1]]=false
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
                            if(val1 === false){
                                return(
                                    // <input type='button' value={String.fromCharCode(index+65)+ (i+1)} className='mr-2 mt-2 bg-danger disabled'/>
                                    <Button disabled color='danger'className='mr-1 mb-1'>{(i+1) + String.fromCharCode(index+65)}</Button>
                                )
                            }return(
                                // <input type='button' value={String.fromCharCode(index+65)+ (i+1)} className='mr-2 mt-2'/>
                                <Button color='success' className='mr-1 mb-1'>{(i+1) + String.fromCharCode(index+65)}</Button>
                            )
                        })
                    }
                </tr>
            )
        })
        return jsx
        console.log(arr)

    }
    render(){
        
        return(
            <div className='container mt-5 md-5 justify-content-center'>
                <h1 style={{textAlign:'center'}}>Order Seat Here</h1>
                <table>
                    {this.renderSeat()}
                </table>
            </div>
        )
    }
}

export default Reservation;