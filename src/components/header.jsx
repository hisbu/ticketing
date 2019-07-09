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
    }

    checkLoginStatu=()=>{
      
        if(this.props.user==='' && localStorage.get('userLogin')!==null){
          return(<Loader type="ThreeDots" color="#somecolor" height={30} width={30} />)
        }
      }
    
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/"  style={{color:'white'}}>Ticket</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              <Link to='/manageMovie'  >
                <NavItem>
                  <NavLink  style={{color:'white'}}>Manage Movie</NavLink>
                </NavItem>
              </Link>
              {this.checkLoginStatu}
              {this.props.name !== ''?
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret style={{color:'white'}}>
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
    name : state.user.username

  }
}
export default connect(mapStateToProps, {onLogout}) (Example);