import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Form, FormControl , FormLabel } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';



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
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
 
  return (

    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your user name"
                autoFocus
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
               <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create Password"
                autoFocus
              />
                 <Form.Label>Gender </Form.Label>
              <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                   name="radio-buttons-group"
  >
             <FormControlLabel value="female" control={<Radio />} label="Female" />
             <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
       
         
            </Form.Group>
          </Form>
         

        </Modal.Body>
        
        <Modal.Footer>
        <h6>I accept website's<Link to="/Contract" className="nav-link"   onClick={handleClose}>Terms of Use</Link> and Privacy Notice.</h6>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>

          <Button variant="primary"  onClick={handleClose}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    
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
          onClick={() => showMobilemenu()}
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
              Sign Up
              </Button>
              {/* // {modalOpen && <Modal setOpenModal={setModalOpen} backdrop={true}/>} */}
                    </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
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
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
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

            <DropdownItem >
              <Link to="/forgotPass">
              Forgot Password
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

export default Header;
