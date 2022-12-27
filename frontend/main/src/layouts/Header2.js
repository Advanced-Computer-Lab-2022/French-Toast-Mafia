import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Form, FormControl , FormLabel } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import {Box, Typography } from '@mui/material'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Alert
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";



const Header2 = () => {

  const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = React.useState(false);
//   const [modalOpen, setModalOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu2 = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  
  return (

    <div>    
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu2()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
      

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>

          <NavItem>
            < Button    onClick={handleShow}  color="Transparent" >
              Home
              </Button>
          </NavItem>

           <NavItem>
            < Button    onClick={handleShow}  color="Transparent" >
              Instructors
              </Button>
          </NavItem>

          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Apply
            </DropdownToggle>
            {/* <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu> */}
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem Header2>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem>Contact us </DropdownItem>
            <DropdownItem>Settings </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance
            </DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
          
            <DropdownItem >
              <Link to="/Users">
              Users
              </Link>
              </DropdownItem>
              
            <DropdownItem >
              <Link to="/InstructorProfile">
              Instructor Profile
              </Link>
              </DropdownItem>
              
              <DropdownItem >
              <Link to="/Instructors">
              Instructors
              </Link>
              </DropdownItem>

            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
    </div>
  );
};

export default Header2;
