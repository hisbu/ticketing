import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
class Register extends Component{
    render (){
        return(
            <div className='Container'>
                <div className = "row justify-content-center mt-5">
                    <div className='col-md-6'>
                        <Paper className='p-5'>
                            <input className='form-control mt-3' type='text' placeholder='username' />
                            <input className='form-control mt-3' type='text' placeholder='password' />
                            <input className='form-control mt-3' type='text' placeholder='Confirm Password'/>
                            <input type='button' className='btn btn-primary mt-5' value='Register Now'/>
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

export default Register;