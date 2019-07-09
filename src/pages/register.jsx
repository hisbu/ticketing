import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import Axios from 'axios';
import Loader from 'react-loader-spinner'
import { OnRegisterSuccess } from './../redux/actions'
import { connect } from 'react-redux'
import { TextInput } from 'react-materialize'


//ambil input value
//password dan confirm password hasus sama
// klik register
//

class Register extends Component{
    state={
        error:'',
        loading: false,
    }

    onBtnRegisterClick=()=>{
        var username = this.refs.username.value
        var password = this.refs.password1.value
        var confirm = this.refs.password2.value
        
        if(username === ''|| password === '' || confirm === ''){
            this.setState({error: 'Semua form harus di isi'})
        }else{
            if(password !== confirm){
                this.setState({error: 'password not match'})
            }else{
                this.setState({loading:true})
                Axios.get('http://localhost:2000/user?username='+username)
                .then((res)=>{
                    if(res.data.length > 0){
                        this.setState({error: "Username has been taken", loading: false})
                    }else{
                        Axios.post('http://localhost:2000/user', {username, password})
                        .then((res)=>{
                            this.props.OnRegisterSuccess(res.data)
                            localStorage.setItem('userLogin', res.data.username)
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
        }
    }

    render (){
        if(this.props.user.username !==''){
            return <Redirect to="/"/>
        }
        return(
            <div className='Container'>
                <div className = "row justify-content-center mt-5">
                    <div className='col-md-6'>
                        <Paper className='p-5'>
                            
                            <input ref="username" className='form-control mt-3' type='text' placeholder='username' />
                            <input ref="password1" className='form-control mt-3' type='password' placeholder='password' />
                            <input ref="password2" className='form-control mt-3' type='text' placeholder='Confirm Password'/>
                            {
                                this.state.error===''?null: //jika state error bernilai kosong maka 'null' 
                                <div className="alert alert-danger mt-3">{this.state.error}<span style={{fontWeight:"bold", cursor:"pointer", float:"right"}} onClick={()=>this.setState({error:''})}>x</span></div>
                            }

                            {
                                this.state.loading === true 
                                ?
                                <Loader type='ThreeDots' color='blue' width='40px'/>
                                :
                                <input type='button' className='btn btn-primary mt-3' onClick={this.onBtnRegisterClick} value='Register Now'/>
                            }
                            <p style={{fontStyle:'italic', fontSize:'11px'} }className='mt-3'>Sudah punya akun?
                            <Link to='/login'>
                                <span style={{fontStyle:'none', textDecoration:'underline'}}> Login sekarang</span>
                            </Link>
                            </p>
                        </Paper>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps, {OnRegisterSuccess}) (Register);