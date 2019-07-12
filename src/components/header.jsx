import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogout } from './../redux/actions'
import { Loader } from 'react-loader-spinner'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Redirect } from 'react-router-dom'
import { ApiUrl} from './../support/urlApi'
import Axios from 'axios';

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

class Example extends React.Component {

    state={
        isOpen: false,
        logout:false,
        data:null,
        cart:null
    }

    componentDidMount=()=>{
      console.log(this.props.name)
      var user = localStorage.getItem('userLogin')
      Axios.get(ApiUrl+'/user?username='+ user)
      .then((res)=>{
        console.log(res.data[0].cart)
        this.setState({data: res.data})
        console.log(this.state.data)
        this.setState({cart: res.data[0].cart.length})
        // this.setState({cart: res.data[0].cart.length})
        console.log(this.state.cart)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    toggle= ()=> {
        this.setState({
        isOpen: !this.state.isOpen
    });
    }

    onBtnLogoutClick=()=>{
      this.props.onLogout()
      localStorage.removeItem('userLogin')
      localStorage.removeItem('fromMovieDetail')
      localStorage.removeItem('filmId')
      // this.setState({logout: true})
    }

    checkLoginStatu=()=>{
      
        if(this.props.user ==='' && localStorage.get('userLogin')!==null){
          return(<Loader type="ThreeDots" color="#somecolor" height={30} width={30} />)
        }
      }
    
  render() {
    // if(this.state.data===null){
    //   return(
    //     <p>loading data</p>
    //   )
    // }
    if(this.state.logout===true){
      return ( <Redirect to='/'/>)
    }
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/"  style={{color:'white'}}>Q~Cinema</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              {this.props.name !=='' && this.props.role !== 'admin'? 
              <Link to='/cart'>
                <NavItem>
                  <NavLink style={{color:'white', fontSize:'20px'}}>
                    {/* <FontAwesomeIcon icon={faShoppingCart}/>{this.props.cart.length} */}
                    <IconButton aria-label="Cart">
                      <StyledBadge badgeContent={this.state.cart} color="primary">
                        <ShoppingCartIcon style={{color:"white"}} />
                      </StyledBadge>
                    </IconButton>
                    </NavLink>
                </NavItem>
              </Link>:null
              }
              {this.props.role ==='admin'?
                <Link to='/manageMovie'  >
                  <NavItem>
                    <NavLink  style={{color:'white'}}>Manage Movie</NavLink>
                  </NavItem>
                </Link>:
                null
              }
              {this.checkLoginStatu}
              {this.props.name !== ''?
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret style={{color:'white', top:'50%'}}>
                  {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                  {
                    this.props.role==='admin'?null:
                  <DropdownItem>
                    <Link to={{pathname:'/history', state:this.props.id}}> History Transaksi</Link>
                  </DropdownItem>
                  }
                  <DropdownItem>
                    <Link to={{pathname:'/profile', state:this.props.id}}>Profile</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    <Link to='/'>Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            : 
            <NavItem>
              <Link to='/login'  >
                <NavLink style={{color:'white'}}>Login</NavLink>
                </Link>
              </NavItem>
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    name : state.user.username,
    role : state.user.role,
    cart : state.user.cart,
    id : state.user.id
  }
}
export default connect(mapStateToProps, {onLogout}) (Example);