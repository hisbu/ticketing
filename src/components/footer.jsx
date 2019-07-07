import React from 'react'
import {} from 'materialize-css'
import {Footer} from 'react-materialize'


class FooterPage extends React.Component{
    render(){
        return(
            <Footer>
                <div className='row justify-content-center footer kotak'>
                    <span style={{color:'white'}}>Footer</span>
                </div>

            </Footer>
        )
    }
}

export default FooterPage;