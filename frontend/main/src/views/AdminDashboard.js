import { Col, Row, Alert, ListGroup, CardBody, Card, CardTitle} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


import LatestReports from "../components/dashboard/LatestReports";
import LatestRequests from "../components/dashboard/LatestRequests";

import { getAllReports } from "../api/axios";

import { getAllRequests } from "../api/axios";
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';


const AdminDashboard = () => {
    const [ref,setRef] = useState(false);
    const search = useLocation().search;
    const aId = new URLSearchParams(search).get('id');

    const[reports, setReports] = useState([ ]);
    const[requests, setRequests] = useState([ ]);
  
    const handleClose2 = () => setShow2(false); 
    const [show2, setShow2] = useState(false);
    
    const [show1, setShow1] = useState(false);
    
  
    const handleClose1 = () => setShow1(false); 

    const handleShow2 = () => setShow2(true); 

    const[AdminName , setAdminName] = useState('')
    const[AdminId , setAdminid] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        //navigate("/AdminAdded");


        const admin = { AdminName , AdminId  }
        const response = await fetch('http://localhost:5000/Admin/createAdmin' , {
            method : 'POST' ,
            body : JSON.stringify(admin) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 

        const json = await response.json(admin)

        if(!response.ok){
            setErr(json.err)

        }
        if(response.ok){
            setAdminName('')
            setAdminid('')

            setErr(null)
            console.log('new admin added', json)
        }
   }
  
   const handleClose3 = () => setShow3(false); 
   const [show3, setShow3] = useState(false);

   const handleShow3 = () => setShow3(true); 

   const[Name , setName2 ] = useState('')
   const[Email , setEmail2] = useState('')
   const[Password , setPassword2] = useState('')
   const[Type , setType2] = useState('')
   const[Gender , setGender] = useState('')
   
   const[cpform, setCPForm] = useState({});
   const[cpErrors, setCPErrors] = useState({});
 


   const[err1 , setErr] = useState("")

   const navigate = useNavigate();

   const handleSubmit1 = async (e) => {
       e.preventDefault();

       const corporateTrainees = { Name, Email , Password , Type , Gender }
       const response = await fetch('http://localhost:5000/Admin/createCorporatetrainess' , {
           method : 'POST' ,
           body : JSON.stringify(corporateTrainees) , 
           headers : {
               'Content-Type' : 'application/json'
           }
       }) 

       const json = await response.json(corporateTrainees)

       if(!response.ok){
           setErr(json.err)

       }
       if(response.ok){
           setName2('')
           setEmail2('')
           setPassword2('')
           setType2('')
           setGender('')

           setErr(null)
           console.log('new corporate-trainee added', json)
       }
  }
  
  const handleClose4 = () => setShow4(false); 
    const [show4, setShow4] = useState(false);

    const handleShow4 = () => setShow4(true); 

    const[InstrEmail , setEmail3] = useState('')
    const[InstrPassword , setPassword3] = useState('')


    const setCPField = (field, value) =>{
      setCPForm({
          ...cpform,
          [field]:value,
      })
      if(!!cpErrors[field])
      setCPErrors({
          ...cpErrors,
          [field]:null,
      })
    }
    
    const validateCPForm = () =>{
      const { promotion, start, end} = cpform
      const newErrors = {}
    
      if(!promotion ||promotion === "")
      newErrors.promotion = "Please enter a course promotion"
      if(!start|| start === "")  
      newErrors.start = "Please enter a start time"
      if(!end|| end === "")  
      newErrors.end = "Please enter an end time"
      return newErrors
    }

const handleCPSubmit = async (e) => {
  console.log("jjjjjjjjjjj")

  e.preventDefault();

  const formErrors = validateCPForm()

  if(Object.keys(formErrors).length > 0){
      setCPErrors(formErrors)
  }
  else{

      await fetch('http://localhost:5000/Admin/addPromotionAll',{
          method: 'POST',
          body: JSON.stringify({"Promotion" : cpform.promotion,
            "StartDatePromotion": cpform.start,
            "EndDatePromotion": cpform.end}),
          headers : {
              'Content-Type':'application/json'
          }
      }).then(json =>{
        handleClose1()
        window.location.reload();
      })
  }
}


    const handleSubmit2 = async (e) => {
        e.preventDefault();

        const instructor = {  InstrEmail , InstrPassword }
        const response = await fetch('http://localhost:5000/Admin/addInstructor' , {
            method : 'POST' ,
            body : JSON.stringify(instructor) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 

        const json = await response.json(instructor)

        if(!response.ok){
            setErr(json.err)

        }
        if(response.ok){
            setEmail3('')
            setPassword3('')

            setErr(null)
            console.log('new instr added', json)
        }
  }



    useEffect(() => {
        getAllReports().then(json => {
          setReports(json)
        })
        getAllRequests().then(req => {
          setRequests(req)
        })
      }, []);

  return (
    <div>
      {/***Top Cards***/}
      {/* <div>
            <Alert color="success" isOpen={reportAlert} toggle={onDismiss.bind(null)}>
              Thank you for reporting the issue.
            </Alert>
          </div> */}
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="6">
            <LatestReports reports = {reports}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="6">
            <LatestRequests requests = {requests}/>
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
      </Row>
      
      {/* Add admin */}
      <Modal show={show2} onHide={handleClose2}> 
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="set admin name"
                value={ AdminName }
               onChange={(e) => setAdminName( e.target.value)}
                autoFocus
              />  
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="set admin password"
                value={ AdminId }
                onChange={(e) => setAdminid(e.target.value)}
                autoFocus
              />                
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant='contained' onClick={handleClose2}>
            Close
          </Button>
          <Button color="primary" variant='contained' onClick={handleSubmit}>
              Add Admin
          </Button>
          
        </Modal.Footer>
      </Modal>

      <Card>
        <CardBody>
          <Row>
            <Col lg="10">
              <CardTitle tag="h4">Admins</CardTitle>
            </Col>
            <Col lg="2">
            <Button className="btn" outline color="primary" variant="contained"  onClick={() => setShow2(true)}>Add New</Button>
            {/* <Button className="btn" outline color="primary" onClick={() => navigate(`/`)}>View All</Button> */}
            </Col>
          </Row>
          <hr/>
        </CardBody>
        </Card>

        {/*Add user */}

        <Modal show={show3} onHide={handleClose3}> 
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="set user-name"
                value={ Name }
               onChange={(e) => setName2( e.target.value)}
                autoFocus
              />  
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="set email"
                value={ Email }
                onChange={(e) => setEmail2(e.target.value)}
                autoFocus
              />  
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="set password"
                value={ Password }
                onChange={(e) => setPassword2(e.target.value)}
                autoFocus
              />
              <Form.Label>Type</Form.Label>
              <Form.Control
                type=" m "
                placeholder="set user type"
                value={ Type }
                onChange={(e) => setType2(e.target.value)}
                autoFocus
              />   
              <Form.Label> Gender </Form.Label>
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
          <Button color="secondary" variant='contained' onClick={handleClose3}>
            Close
          </Button>
          <Button color="primary" variant='contained' onClick={handleSubmit1}>
              Add 
          </Button>
          
        </Modal.Footer>
      </Modal>

      <Card>
        <CardBody>
          <Row>
            <Col lg="10">
              <CardTitle tag="h4">Users</CardTitle>
            </Col>
            <Col lg="2">
            <Button className="btn" outline color="primary" variant="contained" onClick={() => setShow3(true)}>Add New</Button>
            {/* <Button className="btn" outline color="primary" onClick={() => navigate(`/`)}>View All</Button> */}
            </Col>
          </Row>
          <hr/>
        </CardBody>
        </Card>

        <Modal show={show4} onHide={handleClose4}> 
        <Modal.Header closeButton>
          <Modal.Title>Add new instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="set email"
                value={ InstrEmail }
                onChange={(e) => setEmail3(e.target.value)}
                autoFocus
              />  
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="set password"
                value={ InstrPassword }
                onChange={(e) => setPassword3(e.target.value)}
                autoFocus
              />
             
             </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant='contained' color="secondary" onClick={handleClose4}>
            Close
          </Button>

          <Button variant="contained" color="primary" onClick={handleSubmit2}>
              Add 
          </Button>
          
        </Modal.Footer>
      </Modal>

      <Card>
        <CardBody>
          <Row>
            <Col lg="10">
              <CardTitle tag="h4">Instructors</CardTitle>
            </Col>
            <Col lg="2">
            <Button className="btn"  color="primary" variant="contained"  onClick={() => setShow4(true)}>Add New</Button>
            {/* <Button className="btn" outline color="primary" onClick={() => navigate(`/`)}>View All</Button> */}
            </Col>
          </Row>
          <hr/>
        </CardBody>
        </Card>
        <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Course Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group controlId="Promotion">
                    <Form.Label>Promotion:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. '50'"
                        value = {cpform.promotion}
                        onChange={(e) => setCPField('promotion', e.target.value)}
                        isInvalid={!!cpErrors.promotion}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {cpErrors.promotion}
                    </Form.Control.Feedback>
                </Form.Group>

              <br/>
            <Form.Group controlId="start">
              <Form.Label>Promotion Start Time:</Form.Label>
              <Form.Control 
                        type="text"
                        placeholder="Ex. 'YYYY-MM-DD'"
                        value = {cpform.start}
                        onChange={(e) => setCPField('start', e.target.value)}
                        isInvalid={!!cpErrors.start}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {cpErrors.start}
                    </Form.Control.Feedback>
      
            </Form.Group>
               <Form.Group controlId="subject">
                   <Form.Label>Promotion end time :</Form.Label>
                   <Form.Control 
                       type="text"
                       placeholder="Ex. 'YYYY-MM-DD'"
                       value = {cpform.end}
                       onChange={(e) => setCPField('end', e.target.value)}
                       isInvalid={!!cpErrors.end}
                   ></Form.Control>
                   <Form.Control.Feedback type='invalid'>
                       {cpErrors.end}
                   </Form.Control.Feedback>
               </Form.Group>
               <br/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleClose1} >
            Close
          </Button>
          <Button color="primary" onClick={handleCPSubmit}>
            Save Promotion
          </Button>
        </Modal.Footer>
      </Modal>

        <Card>
        <CardBody>
          <Row>
            <Col lg="10">
              <CardTitle tag="h4">Courses </CardTitle>
            </Col>
            <Col lg="2">
            <Button className="btn"  color="primary" variant="contained"  onClick={() =>setShow1(true)}> Add Promotion</Button>
            {/* <Button className="btn" outline color="primary" onClick={() => navigate(`/`)}>View All</Button> */}
            </Col>
          </Row>
          <hr/>
        </CardBody>
        </Card>
        

    </div>
  );
};

export default AdminDashboard;
