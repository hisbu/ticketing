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

export default class Example extends React.Component {
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
              <NavItem>
              <Link to='/login'  >
                <NavLink style={{color:'white'}}>Login</NavLink>
                </Link>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}