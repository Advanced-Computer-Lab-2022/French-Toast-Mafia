import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button, Row, Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Input,
    Alert
    } from "reactstrap";
  import {useState, useEffect} from 'react';
  import Modal from "react-bootstrap/Modal";
  import { Form, FormControl , FormLabel,  } from "react-bootstrap";
  import RadioGroup from '@mui/material/RadioGroup';
  import { Radio } from "@mui/material";
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Snackbar from '@mui/material/Snackbar';
  import axios from 'axios';
  import TextField from '@mui/material/TextField';
  import Box from '@mui/material/Box'
  
  import React from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  
  import 'react-credit-cards/es/styles-compiled.css';
  import Cards from 'react-credit-cards';
  import MuiAlert from '@mui/material/Alert';
  
  import 'reactjs-popup/dist/index.css';
  import { useNavigate } from 'react-router-dom';
  
  
  // import Chart from "react-apexcharts";
  
  const CourseInfoA = ({cId,course,instructor,ratingLength,setReportAlert}) => {
  
    const [show, setShow] = useState(false);
    const [okay, setOkay] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [problemType, setProblemType] = useState("Technical");
    const [description, setDescription] = useState("");
    const [reportedBy ,setReportedBy] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    
     const [requested_by, setRequestedBy] = useState('');
     const [open, setOpen] = React.useState(false);

     const [dropdownOpen1, setDropdownOpen1] = useState(false);
  
  
    const reportData = {};
  
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const toggl = () => setDropdownOpen1((prevState) => !prevState);

    const viewReports = () => console.log("view reports!");

    const viewRequests = () => console.log("view requests!");
  
   
    let stars = [];
  
    for (var i = 0; i < parseInt(course.avgRating); i++) {
      stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
      if (((course.avgRating)-parseInt(course.avgRating)) >0){
        stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
      }
  }
  
    const handleClose = () => setShow(false);


    const [show1, setShow1] = useState(false);
   
    const handleClose1 = () => setShow1(false);


    const[cpform, setCPForm] = useState({});
    const[cpErrors, setCPErrors] = useState({});
  
  
    const handleShow = () => setShow(true);
    const handleOkay = () => setOkay(true);
  
    const handleDone = () => navigate("/home");
  
  
    const navigate = useNavigate();
  
  
  
    const [focus, setFocus] = useState('');
  
    const[err , setErr] = useState(false);
  
    const[done , setDone] = useState(false);


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

      await fetch(`http://localhost:5000/Instructor/addPromotion?id=${cId}`,{
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
    
  
  
    const handleReportSubmit = async(req , res) => {
      reportData["type"] = problemType;
      reportData["description"] = description;
      reportData["reported_by"] = reportedBy;
  
      console.log(reportData)
  
    await fetch(`http://localhost:5000/Report/addReport?id=${cId}`,{
        method: 'POST',
        body: JSON.stringify(reportData),
        headers : {
            'Content-Type':'application/json'
        }
    }).then(json =>{
     handleClose()
    return setReportAlert(true)
    })
  
  }
  const handleC = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleRequestSubmit = async (e) => {
    setOpen(true);
    e.preventDefault();
    const request = {requested_by}
    const response = await fetch(`http://localhost:5000/Request/createRequest?id=${cId}` , {
        method : 'POST' ,
        body : JSON.stringify(request) , 
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json(request)
    if(!response.ok){
        setErr(json.err)  
        console.log("Erorrrrrrrrrrrrrrrrrrrr")    
        if (response.status==404){
          setErrorMessage('You have already requested this course')
        }
        //console.log(errorMessage);

    }
    if(response.ok){
        setRequestedBy('')
        //setErrorMessage(response.data.Message);
        setErr(false)
        console.log('new request sent', json)
        //console.log(response)
        //console.log("Hellllo")
        //console.log(errorMessage);
        setDone(true);
        if (response.status==200){
          setErrorMessage('Requested the course succesfuly')
        }

    }
   
}

   
    return (
        <div>
       
      <div>
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
        
        </div>
        <div>

        {/* <Modal show={show}  onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Report Problem</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="problemReport">
                <Form.Label>Reporter id:</Form.Label>
                <br/>
                <Input
                        id="reported_by"
                        onChange={(e) => setReportedBy(e.target.value)}
                      />
                <br/>
              <Form.Label>Problem Type:</Form.Label>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Technical"
                  name="radio-buttons-group"
    >
                <FormControlLabel value="Technical" control={<Radio />} label="Technical" onChange={(e) => setProblemType("Technical")} />
                <FormControlLabel value="Financial" control={<Radio />} label="Financial" onChange={(e) => setProblemType("Financial")}/>
                <FormControlLabel value="Other" control={<Radio />} label="Other" onChange={(e) => setProblemType("Other")}/>
              </RadioGroup>
                <br/>
                <Form.Label>Problem Description: </Form.Label>
                <Input
                type="textarea"
                id="description" rows="3" required="true" onChange={(e) => setDescription(e.target.value)}/>
                <br/>
               
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button outline color="danger"onClick={handleClose} >
              Close
            </Button>
            <Button color="primary" onClick={handleReportSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal> */}
        </div>
        
  
  
      <Card sx={{
      height: "350px"}}>
  
        <CardBody>
  
          <Row>
            <Col>
              <CardTitle tag="h4">{course.NameOfCourse}</CardTitle>
              <CardSubtitle className="text-muted" tag="h6"> {course.Summary}</CardSubtitle>
            </Col>
            <Col className="text-end">
          
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
  
            <DropdownToggle className="btn btn dropdown-toggle dropdown-toggle-split" outline color="danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Report&nbsp;&nbsp;&nbsp;</DropdownToggle>
            <DropdownMenu>
            <DropdownItem id="ReportProblem" onClick={handleShow}>Report Problem</DropdownItem>
            <DropdownItem id="viewReports"   onClick={viewReports}>View Course Reports</DropdownItem>
            </DropdownMenu> </Dropdown> */}
            </Col>
          </Row>
         
          <br/>
          <Row>
          <Col lg>
          <CardText>Difficulty: {course.LevelOfCourse}</CardText>
          <CardText className="mt-3 text-muted">{stars}&nbsp;({ratingLength}) </CardText>
          <CardText> <CardText tag="h6"><span class="bi bi-clock"></span> &nbsp;{course.Duration} hours</CardText></CardText>
          <CardText><span class="bi bi-person"></span>&nbsp; {instructor} </CardText>
          <CardText className="text-muted">Last updated on: {course.updatedAt}</CardText>
          </Col>
          <Col className="text-end">
            <br/><br/><br/><br/><br/>
            <CardTitle tag="h4" className="text-primary">Price: {course.Cost} EGP</CardTitle>
            <h1>  </h1>
            <Col className="text-end">

            <Button className="btn" color="primary"  onClick={setShow1} >Add Promotion </Button>   

        
      
        </Col>
      
            </Col>
  
          </Row>
  
        </CardBody>
      </Card>
  
      <>
  

    </>
  
  </div>
      
    );
  };
  
  export default CourseInfoA;
  
  
  
  
  
    
  
    
  
  
  
  
  
  
  
  
  
  