import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { OnRegisterSuccess } from './../redux/actions'
import Axios from 'axios';
import { ApiUrl } from './../support/urlApi'


// Ambil value dari input user
//validasi inputan
//get data user berdasarkan inputan
//jika ada data berarti login berhasil
//jika tidak ada login gagal
class LoginPage extends Component{
    state={
        error : '',
        login:false
    }

    onBtnLoginClick=()=>{
        var username = this.refs.username.value
        var password = this.refs.password.value

        if(username === '' ||password === ''){
            this.setState({error:'lengkapi form login anda'})
        }

        console.log(username, password)
        Axios.get(ApiUrl+'/user?username='+username+'&&password='+password)
        .then((res)=>{
            
            if(res.data.length === 0){
                this.setState({error:'kombinasi username dan password tidak ditemukan'})
                // alert('user tidak ditemukan')
                console.log('user tidak ditemukan')
            }else{
                this.setState({error: ''})
                this.setState({login:true})
                this.props.OnRegisterSuccess(res.data[0])
                localStorage.setItem('userLogin', username)
                // alert('login success')
            }
        })

        .catch((err)=>{
            console.log(err)
        })
    }
    render (){
        if(this.props.username!==''){
            return <Redirect to="/"/>
        }
        return(
            
            <div className='Container'>
                <div className = "row justify-content-center mt-5">
                    <div className='col-md-6'>
                        <Paper className='p-5'>
                            <h1>Login</h1>
                            <input className='form-control mt-3' ref='username' type='text' placeholder='username' />
                            <input className='form-control mt-3' ref='password' type='password' placeholder='password' />
                            {
                                this.state.error ===''? null:
                                <div className='alert alert-danger mt-3'>{this.state.error}</div>
                            }
                            <input type='button' onClick={this.onBtnLoginClick} className='btn btn-primary mt-5' value='Login Now'/>
                            <p style={{fontStyle:'italic', fontSize:'11px'} }className='mt-3'>Belum punya akun?
                            <Link to='/register'>
                                <span style={{fontStyle:'none', textDecoration:'underline'}}> Daftar sekarang</span>
                            </Link>
                            </p>
                        </Paper>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        username : state.user.username
    }
}
export default connect(mapStateToProps, {OnRegisterSuccess}) (LoginPage);