import React from 'react'
import {Paper, Input, Button} from '@material-ui/core'
import { connect } from 'react-redux'
import Axios from 'axios';
import { ApiUrl} from './../support/urlApi'
import { Spinner } from 'reactstrap';
class Profile extends React.Component{
    state = {
        data:null,
        error:'',
        msg:''
    }

    componentDidMount=()=>{
        console.log(this.props.location.state)
        Axios.get(ApiUrl + '/user/'+this.props.location.state)
        .then((res)=>{
            console.log(res.data)
            this.setState({data: res.data})
            
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    onBtnChangeClick=()=>{
        this.setState({error:''})
        var username = this.refs.username.value
        var oldPassword = this.refs.oldPassword.value
        var newPassword = this.refs.newPassword.value
        var confirm = this.refs.confirm.value

        if( username ==='' || oldPassword ===''||newPassword===''|| confirm==='') {
            this.setState({error: 'semua input text harus diisi'})
        }else{
            if(newPassword !== confirm || oldPassword !== this.state.data.password){
                this.setState({error: 'password not match'})
            }else if(newPassword === this.state.data.password){
                this.setState({error: 'password tidak boleh sama dengan password lama'})
            }else{
                Axios.patch(ApiUrl+'/user/'+this.props.location.state, {password: newPassword})
                .then((res)=>{
                    console.log(res.data)
                    this.setState({msg:'Password berhasil di rubah'})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            
        }

    }
    render(){
        if(this.state.data ===null){
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
            <div className='container mt-4'>
                <div className='justify-content-center row'>

                <Paper className='p-5 col-md-6'>
                    <center><h3>Change Password</h3></center>
                    <input ref="username" className='form-control mt-3' type='text' placeholder='username' defaultValue={this.state.data.username}  disabled/>
                    <input ref="oldPassword" className='form-control mt-3' type='password' placeholder='type your old password' />
                    <input ref="newPassword" className='form-control mt-3' type='password' placeholder='enter new password' />
                    <input ref="confirm" className='form-control mt-3' type='password' placeholder='confirm new password' />
                    {
                        this.state.error===''? null: //jika state error bernilai kosong maka 'null' 
                        <div className="alert alert-danger mt-3">{this.state.error}<span style={{fontWeight:"bold", cursor:"pointer", float:"right"}} onClick={()=>this.setState({error:''})}>x</span></div>
                    }
                    {
                        this.state.msg===''? null: //jika state error bernilai kosong maka 'null' 
                        <div className="alert alert-success mt-3">{this.state.msg}<span style={{fontWeight:"bold", cursor:"pointer", float:"right"}} onClick={()=>this.setState({error:''})}>x</span></div>
                    }
                    <input type='button' className='btn btn-primary mt-3' onClick={this.onBtnChangeClick} value='Change Password'/>
                </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        userData: state.user
    }
}
export default connect(mapStateToProps)(  Profile);