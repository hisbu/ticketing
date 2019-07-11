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
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }

    state={
        isOpen: false
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
    }

    checkLoginStatu=()=>{
      
        if(this.props.user ==='' && localStorage.get('userLogin')!==null){
          return(<Loader type="ThreeDots" color="#somecolor" height={30} width={30} />)
        }
      }
    
  render() {
    console.log()
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/"  style={{color:'white'}}>Ticket</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              {this.props.name !==''?
              <Link to='/cart'>
                <NavItem>
                  <NavLink style={{color:'white', fontSize:'20px'}}>
                    {/* <FontAwesomeIcon icon={faShoppingCart}/>{this.props.cart.length} */}
                    <IconButton aria-label="Cart">
                      <StyledBadge badgeContent={this.props.cart.length} color="primary">
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
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    Logout
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
    cart : state.user.cart
  }
}
export default connect(mapStateToProps, {onLogout}) (Example);