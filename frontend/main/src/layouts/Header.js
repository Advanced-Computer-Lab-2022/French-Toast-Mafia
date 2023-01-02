import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Form, FormControl , FormLabel, Row } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import {Box, Typography } from '@mui/material'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import {  FormGroup, FormHelperText } from '@mui/material';

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
  const[Gender , setGender] = useState('')
  const [checked, setChecked] = React.useState(true);
  const [type, setType] = useState("Admin");
  

  const[err , setErr] = useState(null)

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);  
  // const handleClose3 = () => setShow3(false);

  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true); 
  // const handleShow3 = () => setShow3(true);

  const [data, setData] = useState({ Email : "", Password: "" });
	const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
		                        setData({ ...data, [input.name]: input.value });
	                      };


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

  const handlecheck = (event) => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Trainees = { Name, Email , Password , Gender }
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
        setGender('')
        
        setDone(true);
        setErr(null)
        console.log('new corporate-trainee added', json)
    }
}
const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // const signed= {Name, Email , Password, Gender }
      const response = await axios( {
         url: 'http://localhost:5000/Signup//' , 
         method:'post',
         data: { "Name": Name , "Email": Email , "Password": Password , "Gender": Gender },
         headers : { 
            'Content-Type' : 'application/json' 
          }
    })
    .then ((response) => {console.log (response.data)
      navigate("/home")})
    if(!response.ok){
        console.log("bep")
    }
    if(response.ok){
        setName1('')
        setEmail1('')
        setPassword1('')
        setGender('')
        // setDone(true);
        // setErr(null)

  } 
  } catch (error) {
        console.log(error);
      }
      handleClose();
    };
   
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios ({
        method:'post',
        url: 'http://localhost:5000/Login//' ,
        data:{ "Email": Email , "Password": Password } ,
        headers : {
            'Content-Type' : 'application/json'
            },
    })
    .then((response) => 
      {console.log(response.data.userid)
        const id= response.data.id
    // console.log(response.data.userid);
    // console.log(response.data.user);
    localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(Email);
        console.log(Password);
        // navigate("/InstructorHome")
        // navigate(`/MyCourses?userId=${id}`);
    
         if(type=="Instructor"){
         // navigate(`/homeA?id=${id}`);
           navigate(`/InstructorHome?id=${id}`);
        }
        else if(type=="Trainee"){
          navigate(`/home?id=${id}`);
        }
        else if(type=="Coprate Trainee"){
          navigate(`/homeCop?id=${id}`);
        }
        navigate(`/MyCourses?userId=${id}`);
      })
    } catch (error) {
      setError(error.response.data);
    }
    setShow2(false);
  };
    
  
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
                placeholder="Your password must be 8-20 characters long"
                value={ Password }
                onChange={(e) => setPassword1(e.target.value)}
                autoFocus
              />
             
                 <Form.Label>Gender </Form.Label>
              <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                   name="radio-buttons-group"
              >
             <FormControlLabel value="female" control={<Radio />} label="Female"            
               onChange={(e) => setGender(e.target.value)}
              />
             <FormControlLabel value="male" control={<Radio />} label="Male"        
                   onChange={(e) => setGender(e.target.value)}
              />
                </RadioGroup>
                </Form.Group>
              </Form>
            </Modal.Body>
            
            <Modal.Footer>
             {/* check box     */}
              <FormGroup>
              {/* <Link component ={Checkbox}  to="/Contract" className="nav-link"   onClick={handleClose}>I accept website's Terms of use and Privacy notice</Link>
              <FormControlLabel control={<Checkbox defaultChecked />}   />                  */}
              {/* <FormHelperText> Revise your contract before accepting. </FormHelperText> */}
              <Row>
                <div className=" input-group mb-3" style= {{display: 'flex', justifyContent: 'flex-start'}}> 
                <FormControlLabel control={<Checkbox 
                                          checked={checked}
                                          onChange={handlecheck}
                                          inputProps={{ 'aria-label': 'controlled' }} />} />   

                    <Link to="/Contract" className="nav-link"   onClick={handleClose}>I accept website's Terms of use and Privacy notice</Link>           
                    </div>
              </Row>
              </FormGroup>

            {/* <h6>I accept website's<Link to="/Contract" className="nav-link"   onClick={handleClose}>Terms of Use</Link> and Privacy Notice.</h6> */}
              <Button color="secondary" onClick={handleClose} >
                Close
              </Button>

              <Button className="btn" color="primary" size="lg" disabled={!checked} onClick={handleSignUp} >
              
                Sign up
              </Button>

              {done?
            <Alert color="warning"> You have signed-up successfully! 
            <Button variant="primary"  type='submit' onClick={handleClose}>
                Done
            </Button>
            </Alert>:""}

            </Modal.Footer>
          </Modal>



            {/* login button */}
      <Modal show={show2} onHide={handleClose2}> 
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your registered email"
                value={ Email }
               onChange={(e) => setEmail1( e.target.value)}
                autoFocus
              />  
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={ Password }
                onChange={(e) => setPassword1(e.target.value)}
                autoFocus
              />  
              <Form.Label> User Type:</Form.Label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Trainee"
                name="radio-buttons-group"
  >
              <FormControlLabel value="Instructor" control={<Radio />} label="Instructor" onChange={(e) => setType("Instructor")}/>
              <FormControlLabel value="Trainee" control={<Radio />} label="Trainee" onChange={(e) => setType("Trainee")}/>
              <FormControlLabel value="Coprate Trainee" control={<Radio />} label="Coprate Trainee" onChange={(e) => setType("Coprate Trainee")}/>
            </RadioGroup>
              <br/>

              <Link to="/forgotPass" action onClick={handleClose2} >
                Forget password?
               </Link>
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button color="primary" onClick={handleLogin}>
              Login
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
          </NavItem>

           <NavItem>
            < Button    onClick={handleShow2}  color="Transparent" >
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
            <DropdownItem>   
              {/* <button  onclick={()=> navigate(`/UserHome?id=${id}`)}> My account </button>
            {/* <Link to="/UserHome?id=${id}"> */}
               My Account 
              {/* </Link> */} 
            </DropdownItem>
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