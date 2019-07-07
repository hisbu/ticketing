import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';
import { ExpandMore, Theaters, EventSeatOutlined, ExpandLess, AccessTime, ArrowRight} from '@material-ui/icons'

const useStyles = makeStyles(thems => ({
    nested:{
        paddingLeft: thems.spacing(4)
    }
}))



class Filter extends React.Component{
    state={
        listOpen : false
    }

   
    
    
    onListClick=()=>{
        if(this.state.listOpen===false){
            this.setState({listOpen: true})
        }else{
            this.setState({listOpen: false})
        }
        console.log(this.state.listOpen)
        
    }
    render(){
        return(
            <div className='row'>
                <Paper className='col-md-3'>
                    {/* <input type='button' onClick={this.onListClick} value='test'/> */}
                    <List>
                        <ListItem button onClick={this.onListClick}>
                            <ListItemIcon>
                                <Theaters/>
                            </ListItemIcon>
                            <ListItemText primary='Genre'/>
                            {this.state.listOpen === true ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.listOpen} timeout='auto' unmountOnExit>
                            <List >
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='Action'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='Comedy'/>
                                </ListItem>
                            </List>
                        </Collapse>

                        {/* SUtradara */}
                        <ListItem button onClick={this.onListClick}>
                            <ListItemIcon>
                                <EventSeatOutlined/>
                            </ListItemIcon>
                            <ListItemText primary='Sutradara'/>
                            {this.state.listOpen === true ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.listOpen} timeout='auto' unmountOnExit>
                            <List >
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='Riri Riza'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='apa saja lah'/>
                                </ListItem>
                            </List>
                        </Collapse>

                        {/* Playing At */}
                        <ListItem button onClick={this.onListClick}>
                            <ListItemIcon>
                                <AccessTime/>
                            </ListItemIcon>
                            <ListItemText primary='Show Time'/>
                            {this.state.listOpen === true ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.listOpen} timeout='auto' unmountOnExit>
                            <List >
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='09.00'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='14.00'/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Paper>
            </div>
        )
    }
}

export default Filter;