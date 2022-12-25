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


const Header = () => {

  const[done , setDone] = useState(false);
  const[Name , setName1 ] = useState('')
  const[Email , setEmail1] = useState('')
  const[Password , setPassword1] = useState('')
  const[Type , setType1] = useState('')
  const[Gender , setGender] = useState('')

  const[err , setErr] = useState(null)

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const Trainees = { Name, Email , Password , Type , Gender }
    const response = await fetch('http://localhost:5000/User/signUp' , {
        method : 'POST' ,
        body : JSON.stringify(Trainees) , 
        headers : {
            'Content-Type' : 'application/json'
        }
    }) 

    const json = await response.json(Trainees)

    if(!response.ok){
        setErr(json.err)

    }
    if(response.ok){
        setName1('')
        setEmail1('')
        setPassword1('')
        setType1('')
        setGender('')
        
        setDone(true);
        setErr(null)
        console.log('new corporate-trainee added', json)
    }
}
 
  return (

    <div>
        {/* sign up button */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your user name"
                value={ Name }
        onChange={(e) => setName1(e.target.value) }
                autoFocus
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={ Email }
        onChange={(e) => setEmail1( e.target.value)}
                autoFocus
              />
               <Form.Label>Password</Form.Label>
              
              <Form.Control
                type="password"
                placeholder="Create Password"
                value={ Password }
                onChange={(e) => setPassword1(e.target.value)}
                autoFocus
              />
               {/* <Form.Label>Type</Form.Label>
              <Form.Control
                type=""
                placeholder="gender "
                value={ Gender }
                onChange={(e) => setGender(e.target.value)}
                autoFocus
              /> */}
               <Form.Label>Type</Form.Label>
              <Form.Control
                type="type"
                placeholder="enter type"
                value={ Type }
                onChange={(e) => setType1(e.target.value)}
                autoFocus
              />
                {/* <Form.Text className="text-muted">
              Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces.
                 </Form.Text> */}

                 <Form.Label>Gender </Form.Label>
              <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                   name="radio-buttons-group"
  >
             <FormControlLabel value="female" control={<Radio />} label="Female"              onChange={(e) => setGender(e.target.value)}
/>
             <FormControlLabel value="male" control={<Radio />} label="Male"              onChange={(e) => setGender(e.target.value)}
/>

                </RadioGroup>
       
         
            </Form.Group>
          </Form>
         

        </Modal.Body>
        
        <Modal.Footer>
        <h6>I accept website's<Link to="/Contract" className="nav-link"   onClick={handleClose}>Terms of Use</Link> and Privacy Notice.</h6>
          <Button color="secondary" onClick={handleClose} >
            Close
          </Button>

          <Button color="primary"   type='submit' onClick={handleSubmit} >
            Sign Up
          </Button>

          {done?
        <Alert color="warning"> You have signed-up successfully! 
        <Button variant="primary"  type='submit' onClick={handleClose}>
      Done
    </Button>
    </Alert>:""}

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
          </NavItem>

           <NavItem>
            < Button    onClick={handleShow}  color="Transparent" >
              Login
              </Button>
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
