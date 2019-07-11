import React from 'react'
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {Button} from 'reactstrap'
import {Paper, Table, TableBody,TableHead, TableCell, TableRow, TableFooter} from '@material-ui/core'
import { connect } from 'react-redux'
import Axios from 'axios';
import {ApiUrl} from './../support/urlApi'

class CartPage extends React.Component{
    state={
        totalHarga:0,
        userData: []
    }

    componentDidMount=()=>{
        // console.log('dari props page cart')
        // console.log(this.props.userData.cart)
    }

    renderData=()=>{

        // Axios.get(ApiUrl+'/user/?id='+this.props.userData.id)
        // .then((res)=>{
        //     console.log(res.data)
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }

    onBtnCheckoutClick=()=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        Axios.get(ApiUrl+'/user?id='+this.props.userData.id) 
        .then((res)=>{
            console.log('data dari didmount cart')
            // console.log(res.data)
            this.setState({userData: res.data})
            // console.log(this.state.userData)
            var cart = res.data[0].cart
            console.log(res.data[0].cart)
            var obj=[{
                "tgl":dateTime,
                "items":cart
            }]
            var trans = [...res.data[0].transaction, ...obj]
            Axios.patch(ApiUrl+'/user/'+this.props.userData.id, {transaction : trans, cart : []})
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(this.state.userData)
        // console.log(this.props.userData.id)
    }

    printData=()=>{
        var value = this.props.userData.cart
        var total = 0
        var jsx = value.map((val, i) =>{
            total+=val.total
            return(
                <TableRow>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell>{val.total}</TableCell>
                </TableRow>
                )
        })
        // console.log('nilai dari total '+total)
        // this.setState({totalHarga: total})
        return jsx
    }
    render(){
        return(
            <div className='container justify-content-center mt-5'>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell> No </TableCell>
                            <TableCell> Title </TableCell>
                            <TableCell> Qty Seat </TableCell>
                            <TableCell> Harga</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.printData()}
                        </TableBody>
                        <TableFooter>
                            <TableCell colSpan='3' align='right'>Total</TableCell>
                            <TableCell>Rp. {this.state.totalHarga}</TableCell>
                        </TableFooter>
                    </Table>
                </Paper>
                <Button onClick={this.onBtnCheckoutClick} color='primary' className='mt-4 '>Check Out</Button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        userData : state.user

    }
}

export default connect(mapStateToProps) (CartPage);