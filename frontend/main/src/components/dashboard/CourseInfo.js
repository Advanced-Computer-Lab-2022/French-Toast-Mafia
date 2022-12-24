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

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';

import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';


// import Chart from "react-apexcharts";

const CourseInfo = ({cId,course,instructor,ratingLength,setReportAlert}) => {

  const [show, setShow] = useState(false);
  const [okay, setOkay] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [problemType, setProblemType] = useState("Technical");
  const [description, setDescription] = useState("");
  const [reportedBy ,setReportedBy] = useState("");


  const reportData = {};

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const viewReports = () => console.log("view reports!");

 
  let stars = [];

  for (var i = 0; i < parseInt(course.avgRating); i++) {
    stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
    if (((course.avgRating)-parseInt(course.avgRating)) >0){
      stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
    }
}

  const handleClose = () => setShow(false);
  const handleClose1 = () => setOkay(false);


  const handleShow = () => setShow(true);
  const handleOkay = () => setOkay(true);

  const handleDone = () => navigate("/home");


  const navigate = useNavigate();


  const [CardNumber, setNumber] = useState('');

  const [CardName, setName] = useState('');

  const [CardCvc, setCvc] = useState('');

  const [CardExpiry, setExpiry] = useState('');

  const [focus, setFocus] = useState('');

  const[err , setErr] = useState(false);

  const[done , setDone] = useState(false);


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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(CardNumber.length==0 || CardName.length==0 || CardCvc.length==0 || CardExpiry.length==0){
      setErr(true);
    }

    const card = { CardName, CardNumber , CardExpiry , CardCvc }
    const response = await fetch('http://localhost:5000/Card/addCard' , {
        method : 'POST' ,
        body : JSON.stringify(card) , 
        headers : {
            'Content-Type' : 'application/json'
        }
    }) 

    const json = await response.json(card)

    if(!response.ok){
        setErr(json.err)
           

    }
    if(response.ok){
        setName('')
        setNumber('')
        setExpiry('')
        setCvc('')


          setErr(false)
          console.log('new card added', json)
          setDone(true);
    }
}
  
 
  return (
      <div>
     
    <div>
      <Modal show={show}  onHide={handleClose}>
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
      </Modal>
      </div>
      


    <Card sx={{width:"687px",display: "flex",
    justifyContent: "space-around",
    height: "-webkit-fill-available",justify:"space-between",
    height: "307px"}}>

      <CardBody>

        <Row>
          <Col>
            <CardTitle tag="h4">{course.NameOfCourse}</CardTitle>
            <CardSubtitle className="text-muted" tag="h6"> {course.Summary}</CardSubtitle>
          </Col>
          <Col className="text-end">
        
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>

          <DropdownToggle className="btn btn dropdown-toggle dropdown-toggle-split" outline color="danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Report&nbsp;&nbsp;&nbsp;</DropdownToggle>
          <DropdownMenu>
          <DropdownItem id="ReportProblem" onClick={handleShow}>Report Problem</DropdownItem>
          <DropdownItem id="viewReports" onClick={() => navigate(`/viewCourseReports?id=${cId}`)}>View Course Reports</DropdownItem>
          </DropdownMenu> </Dropdown>
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
          <Button className="btn" color="primary" size="lg"  onClick={handleOkay} >Register for Course</Button>   

    
          </Col>

        </Row>

      </CardBody>
    </Card>

    <>
   <Modal show={okay} onHide={handleClose1}>
  <Modal.Header closeButton>
    <Modal.Title>Payment Form</Modal.Title>
  </Modal.Header>
  <Modal.Body>
   


{/* <Card className="final-results"  > */}

<h2 className="text-center" > </h2>

<div clasName="rccs__card rccs__card--unknown">
  <Cards
    cvc={CardCvc}

    expiry={CardExpiry}

    focused={focus}

    name={CardName}

    number={CardNumber}

  />
</div>
<br />
<form  onSubmit={ handleSubmit}   >
  <div className="row">
    <div className="col-sm-11">
      <label for="name">Card Number</label>
      <input
        type="text"
        className="form-control"
        value={CardNumber}
        name="CardNumber"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        onFocus={(e) => setFocus(e.target.name)}
        
      ></input>
      

    </div>
    
  </div>
   {err&&CardNumber.length<=0?
        <Alert color="warning"> Card Number can't be empty! </Alert>:""}

  <br />
  
  <div className="row">
    <div className="col-sm-11">
      <label for="name">Card Name</label>
      <input
        type="text"
        className="form-control"
        value={CardName}
        name="CardName"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onFocus={(e) => setFocus(e.target.name)}
      ></input>
    </div>
  </div>

  {err&&CardName.length<=0?
        <Alert color="warning"> Card Name can't be empty! </Alert>:""}

  <br />
  <div className="row">
    <div className="col-sm-6">
      <label for="name">Expiration Date</label>
      <input
        type="text"
        name="expiry"
        className="form-control"
        value={CardExpiry}
        onChange={(e) => {
          setExpiry(e.target.value);
        }}
        onFocus={(e) => setFocus(e.target.name)}
      ></input>
    </div>
    {err&&CardExpiry.length<=0?
        <Alert color="warning"> Expiry date can't be empty! </Alert>:""}

      <div className="col-sm-5">
      <label for="name">CVV</label>
      <input
        type="tel"
        name="cvc"
        className="card"
        value={CardCvc}
        
        onChange={(e) => {
          setCvc(e.target.value);
  
        }}
        onFocus={(e) => setFocus(e.target.name)}
      ></input>
        {err&&CardCvc.length<=0?
        <Alert color="warning"> Card CVC can't be empty! </Alert>:""}
  
    </div>
    
   
  </div>


</form>

{/* </Card> */}

 </Modal.Body>
  <Modal.Footer>
    <Button color="secondary" onClick={handleClose1} >
      Close
    </Button>

    <Button color="primary"  type='submit' onClick={handleSubmit}>
      Pay {course.Cost} EGP
    </Button>

    
    {done?
        <Alert color="warning"> Card is Added Successfully! 
        <Button variant="primary"  type='submit' onClick={handleDone}>
      Done
    </Button>
    </Alert>:""}


  </Modal.Footer> 
   </Modal>

  
  </>

</div>
    
  );
};

export default CourseInfo;





  

  









