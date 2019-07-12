import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Paper, Table, TableBody,TableHead, TableCell, TableRow, TableFooter} from '@material-ui/core'
import { connect} from 'react-redux'
import { ApiUrl} from './../support/urlApi'
import Axios from 'axios';
import Numeral from 'numeral'
class History extends React.Component{
    state={
        dataTransaksi:null,
        modal: false,
        index:null,
        collapse: false
    }

    componentDidMount=()=>{
        // console.log(this.props.userData)
        // console.log(this.props.location.state)
        Axios.get(ApiUrl+'/user/'+this.props.location.state)
        .then((res)=>{
            // console.log(res.data.transaction.items)
            this.setState({dataTransaksi: res.data.transaction})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    toggle=(index)=> {
        // var collapse = !this.state.collapse
        if(this.state.collapse === false){
            this.setState({ collapse: true, index: index });
        }else{
            this.setState({ collapse: false, index: 0 });
        }
      }

    renderData=()=>{
        var data = this.state.dataTransaksi
        var qty=0
        var harga=0
        // console.log(data)
        // console.log(qty + ' - '+harga)
        var test=''
        var jsx = data.reverse().map((val,i)=>{
            var qty=val.items.length
            var total=0
            val.items.map((val1,i)=>{
                // qty+= val1.qty
                total+=val1.total
            })
            return(
                <TableRow>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{val.tgl}</TableCell>
                    <TableCell>{qty}</TableCell>
                    <TableCell>Rp. {Numeral(total).format(0,0)}</TableCell>
                    <TableCell><Button color='primary' onClick={()=>this.renderDetail(i)}>Detail</Button></TableCell>
                </TableRow>
            )
        })
        return jsx
    }

    renderDetail=(index)=>{
        this.setState({ index:index})
        this.setState({modal:true})
        localStorage.setItem('itemsId', index)
        // var data = this.state.dataTransaksi[index].items
        // var jsx = data.map((val,i)=>{
        //     return(
        //             <TableRow>
        //                 <TableCell>{i+1}</TableCell>
        //                 <TableCell>{val.title}</TableCell>
        //                 <TableCell>{val.qty}</TableCell>
        //                 <TableCell>{val.total}</TableCell>
        //             </TableRow>
        //     )
        // })
        
        // return jsx
    }

    closeModal=()=>{
        this.setState({modal: false})
    }

    modalDetail=(index)=>{
        // console.log(this.state.index)
        var id=localStorage.getItem('itemsId')
        // this.setState({modal:true})
        // var index = this.state.index
        // var data = this.state.dataTransaksi[index].items
        return(
        <Modal isOpen={this.state.modal} toggle={this.closeModal}>
          <ModalHeader >Detail Transaction - {this.state.dataTransaksi[id].tgl}</ModalHeader>
          <ModalBody>
            <Table>
                <TableHead>
                    <TableCell> No </TableCell>
                    <TableCell> Title </TableCell>
                    <TableCell> Qty Seat </TableCell>
                    <TableCell> Harga</TableCell>
                </TableHead>
                <TableBody>
                   {
                    //    ()=>{
                        
                        this.state.dataTransaksi[localStorage.getItem('itemsId')].items.map((val,i)=>{
                            return(
                                    <TableRow>
                                        <TableCell>{i+1}</TableCell>
                                        <TableCell>{val.title}</TableCell>
                                        <TableCell>{val.qty}</TableCell>
                                        <TableCell>Rp. {Numeral(val.total).format(0,0)}</TableCell>
                                    </TableRow>
                            )
                        })
                        
                        // return jsx
                    // }
                   }
                </TableBody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeModal}>Close</Button>
           
          </ModalFooter>
        </Modal>

        )
    }
    render(){
        if(this.state.dataTransaksi===null){
            return<p>loading...</p>
        }
       
        return(
            <div className='container mt-4 justify-content-center'>
            {this.modalDetail()}
                <Paper className='p-5'>
                    <center><h2>Histori Transaksi</h2></center>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Detail</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderData()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
    
    
    )
}
}

const mapStateToProps = (state)=>{
    return{
        userData : state.user
    }
}

export default connect (mapStateToProps) (History);