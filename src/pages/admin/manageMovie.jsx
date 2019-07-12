import React from 'react'
import {Table, TableHead, TableBody, TableCell,  TableRow, Paper} from '@material-ui/core'
import {EditOutlined, DeleteOutline, Check, CancelOutlined} from '@material-ui/icons'
import Axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Input} from 'reactstrap'
 

class ManageMovie extends React.Component{
    state = {
        data : [],
        modalOpen: false,
        selectedEdit: 0,
        more : false,
        idMovie:null
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
    RenderSinopsis = (text, id) => {
        // var arr = text.split(' ')
        // var newArr = []
        // for(var i = 0; i< 4; i++){
        //     newArr.push(arr[i])
        // }

        // // console.log(newArr)
        // return newArr.join(' ')


        
            // if(this.state.more === false){
            //     return(
            //     <TableCell>
            //     {text.split(' ').splice(0,4).join(' ')} <span onClick={()=> this.setState({more: true})}>... More</span>
            //     </TableCell>

            //     )

            // }return(
            // <TableCell>
            // {text}<span onClick={()=> this.setState({more: false})}>... Less</span>>
            // </TableCell>

            // )
            
    }

    onBtnEditClick = (id) => {
        this.setState({selectedEdit: id})
        // alert(id)
    }

    onBtnUpdateClick = (id,index) =>{
        var title = this.refs.input2.value
        var sutradara = this.refs.input4.value
        var image = this.refs.input1.value
        var genre = this.refs.input3.value
        var playingAt = this.refs.input5.value.split(',')
        var duration = this.refs.input6.value
        var synopsis = this.refs.input7.value
        var thriller = this.refs.input8.value
        if(title !== '' && sutradara!=='' && genre !== '' && synopsis !== '' && duration !=='' && image !=='' && playingAt!=='' ){
            var objdata={
                title: title,
                genre: genre,
                synopsis: synopsis,
                playingAt: playingAt,
                duration: duration,
                sutradara: sutradara,
                image: image,
                thriller: thriller
            }
            Axios.put('http://localhost:2000/movies/'+this.state.selectedEdit, objdata)
            .then((res)=>{
                alert('data berhasil diupdate')
                var movieData = this.state.data
                movieData[index] = objdata
                this.setState({data: movieData, selectedEdit: 0})
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            alert('Isi Form Dengan Benar')
        }
    }

    renderDataToJsx = () =>{
        var jsx = this.state.data.map((val, index) => {
            if(val.id === this.state.selectedEdit){
                return(
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell><input ref='input1' className='form-control' type='text' defaultValue={val.image}/></TableCell>
                    <TableCell><input ref='input2'  className='form-control' type='text' defaultValue={val.title} /></TableCell>
                    <TableCell><input ref='input3'  className='form-control' type='text' defaultValue={val.genre}/></TableCell>
                    <TableCell><input ref='input4'  className='form-control' type='text' defaultValue={val.sutradara}/></TableCell>
                    <TableCell><input ref='input5'  className='form-control' type='text' defaultValue={val.playingAt.join(',')}/></TableCell>
                    <TableCell><input ref='input6'  className='form-control' type='text' defaultValue={val.duration}/></TableCell>
                    <TableCell><textarea ref='input7'  className='form-control' defaultValue={val.synopsis}/></TableCell>
                    <TableCell><input ref='input8' className='form-control' type='text' defaultValue={val.thriller}/></TableCell>
                    <TableCell><Check onClick={() => this.onBtnUpdateClick(val.id, index)}/></TableCell>
                    <TableCell><CancelOutlined onClick={()=>this.setState({selectedEdit: 0})}/></TableCell>
                </TableRow>

                )
            }
            return(
                <TableRow >
                    <TableCell>{val.id}</TableCell>
                    <TableCell><img src={val.image} alt="" height="100px"/></TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell>{val.playingAt.join(',')}</TableCell>
                    <TableCell>{val.duration}</TableCell>
                    {/* {this.RenderSinopsis(val.synopsis)+'...'} */}
                    {/* <TableCell>{val.synopsis.split(' ').splice(0,4).join(' ')+'...'}</TableCell> */}
                        {
                        this.state.more === true && this.state.idMovie === val.id
                        ?
                        <TableCell>
                        {val.synopsis}<span onClick={()=> this.setState({more: false, idMovie: val.id})} style={{color:'blue', cursor:'pointer'}}>... [Less]</span>
                        </TableCell>
                        :
                        <TableCell>
                        {val.synopsis.split(' ').splice(0,4).join(' ')} <span onClick={()=> this.setState({more: true, idMovie: val.id})} style={{color:'blue', cursor:'pointer'}}>... [More]</span>
                        </TableCell>
                        }
                    <TableCell>{val.thriller}</TableCell>
                    <TableCell><EditOutlined onClick={() => this.onBtnEditClick(val.id, index)}/></TableCell>
                    <TableCell><DeleteOutline onClick={() => this.onBtnDeleteClick(val.id, index)}/></TableCell>
                </TableRow>
            )
        })
        return jsx
    }

    closeModal=()=>{
        this.setState({modalOpen: false})
    }
    
    onBtnSaveClick = () => {

        var playingAt=[]
        for(var i=1;i<6;i++){
            if(this.refs['radio'+i].refs['innerRadio'+i].checked === true){
                playingAt.push(this.refs['radio'+i].refs['innerRadio'+i].value)
            }
        }

        // console.log(playingAt)
        var title = this.refs.title.value
        var sutradara = this.refs.sutradara.value
        var genre = this.refs.genre.value
        var image = this.refs.image.value
        var duration = this.refs.duration.value
        var sinopsis = this.refs.sinopsis.value
        var thriller = this.refs.youtube.value
        var seat = this.refs.seat.value
        

        var data = {
            title: title,
            genre: genre,
            synopsis: sinopsis,
            playingAt: playingAt,
            duration: duration,
            sutradara: sutradara,
            image: image,
            thriller: thriller,
            seats:seat,
            booked:[]

        }

        if(title !== '' && sutradara!=='' && genre !== '' && sinopsis !== '' && duration >0 && image !=='' && playingAt.length > 0 ){
            Axios.post('http://localhost:2000/movies', data)
            .then((res)=>{
                alert('Add data Success')
                var movieData = this.state.data
                movieData.push(res.data)
                this.setState({data: movieData, modalOpen: false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            alert('Semua form harus diisi')
        }
        
    }

    onBtnDeleteClick = (id, index) =>{
        var konfirm = window.confirm('Are you sure want to delete this Data?')
        if(konfirm === true){
            Axios.delete('http://localhost:2000/movies/'+id)
            .then((res) => {
                alert("delete data success")
                var movieData = this.state.data
                movieData.splice(index, 1)
                this.setState({data: movieData})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render(){
        
        return(
            <div>
            {/* <Container fixed> */}
                <center><h1>Manage Movie</h1></center>
                <input type="Button" className="btn btn-success ml-3" value="Add Data" onClick={()=> this.setState({modalOpen: true})}/>
                
                {/*<MODAL START*/}
                <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                    <ModalHeader>
                        Add Movie
                    </ModalHeader>
                    <ModalBody>
                        <input type='text' className='form-control mt-2' placeholder='Title' ref='title'/>
                        <input type='text' className='form-control mt-2' placeholder='Sutradara' ref='sutradara'/>
                        <input type='text' className='form-control mt-2' placeholder='Genre' ref='genre'/>
                        <input type='text' className='form-control mt-2' placeholder='Image' ref='image'/>
                        {/* <input type='text' className='form-control mt-2' placeholder='Playing At' ref='playing'/> */}
                        <div className="mt-3">
                            <FormGroup check inline>
                                <Label check>
                                    Playing At : 
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio1' innerRef='innerRadio1' type="checkbox" value="9"/>09.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio2' innerRef='innerRadio2' type="checkbox" value="14"/>14.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio3' innerRef='innerRadio3' type="checkbox" value="16"/>16.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio4' innerRef='innerRadio4' type="checkbox" value="20"/>20.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio5' innerRef='innerRadio5' type="checkbox" value="22"/>22.00
                                </Label>
                            </FormGroup>

                        </div>
                        <input type='number' className='form-control mt-2' placeholder='Duration' ref='duration'/>
                        <textarea className='form-control mt-2' placeholder='Sinopsis' ref='sinopsis'/>
                        <input type='text' className='form-control mt-2' placeholder='video id youtube' ref='youtube'/>
                        <input type='text' className='form-control mt-2' placeholder='Jumlah seat' ref='seat'/>
                    </ModalBody>
                    <ModalFooter>
                        <input type='Button' value='cancel' onClick={this.closeModal} className='btn btn-danger'/>
                        <input type='Button' value='Save' onClick={this.onBtnSaveClick} className='btn btn-success'/>
                    </ModalFooter>
                </Modal>
                {/*<MODAL END*/}
                <Paper className='m-3 p-3'>
                    <Table >
                        <TableHead>
                            <TableCell >No</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>PlayingAt</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell>Youtube Id</TableCell>
                            <TableCell colSpan="2" style={{textAlign:'center'}}>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderDataToJsx()}

                        </TableBody>
                    </Table>
                </Paper>
            {/* </Container> */}
            </div>
        )
    }
}

export default ManageMovie;