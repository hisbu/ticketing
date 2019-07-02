import React from 'react'
import {Table, TableHead, TableBody, TableCell,  TableRow, Paper,Container} from '@material-ui/core'
import {EditOutlined, DeleteOutline} from '@material-ui/icons'
import Axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'


class ManageMovie extends React.Component{
    state = {
        data : [],
        modalOpen: false
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //function
    RenderSinopsis = (text) => {
        var arr = text.split(' ')
        var newArr = []
        for(var i = 0; i< 5; i++){
            newArr.push(arr[i])
        }

        console.log(newArr)
        return newArr.join(' ')
    }

    renderDataToJsx = () =>{
        var jsx = this.state.data.map((val) => {
            return(
                <TableRow>
                            <TableCell>{val.id}</TableCell>
                            <TableCell><img src={val.image} alt="" height="100px"/></TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.genre}</TableCell>
                            <TableCell>{val.sutradara}</TableCell>
                            <TableCell>{val.playingAt.join(',')}</TableCell>
                            <TableCell>{val.duration}</TableCell>
                            <TableCell>{this.RenderSinopsis(val.synopsis)+'...'}</TableCell>
                            <TableCell><EditOutlined/></TableCell>
                            <TableCell><DeleteOutline/></TableCell>
                            </TableRow>
            )
        })
        return jsx
    }

    closeModal=()=>{
        this.setState({modalOpen: false})
    }
    
    render(){
        return(
            <Container fixed>
                <center><h1>Manage Movie</h1></center>
                <input type="Button" className="btn btn-success mb-3" value="Add Data" onClick={()=> this.setState({modalOpen: true})}/>
                
                {/*<MODAL START*/}
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>
                        Add Movie
                    </ModalHeader>
                    <ModalBody>
                        <input type='text' className='form-control' placeholder='Title'/>
                        <input type='text' className='form-control' placeholder='Sutradara'/>
                        <input type='text' className='form-control' placeholder='Gender'/>
                        <input type='text' className='form-control' placeholder='Image'/>
                    </ModalBody>
                    <ModalFooter>
                        <input type='Button' value='cancel' onClick={this.closeModal} className='btn btn-danger'/>
                        <input type='Button' value='Save' className='btn btn-success'/>
                    </ModalFooter>
                </Modal>
                {/*<MODAL END*/}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>PlayingAt</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell colSpan="2">Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderDataToJsx()}

                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        )
    }
}

export default ManageMovie;