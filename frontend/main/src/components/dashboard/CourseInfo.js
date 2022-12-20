import { CardBody, CardSubtitle, CardText, CardImg, CardTitle, Button, Row, Col } from "reactstrap";
import {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, FormControl , FormLabel } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Card } from '@mui/material';
import { deepPurple, lightGreen } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  UncontrolledAlert,
} from "reactstrap";








// import Chart from "react-apexcharts";

const CourseInfo = ({course,instructor,ratingLength}) => {

  const [show, setShow] = useState(false);
  const [okay, setOkay] = useState(false);



  console.log(ratingLength);

  let stars = [];

  for (var i = 0; i < parseInt(course.avgRating); i++) {
    stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
    if (((course.avgRating)-parseInt(course.avgRating)) >0){
      stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
    }
}

  
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

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
  
  const handleRegister = () =>{
    console.log("Register Clicked!");
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Problem Type:</Form.Label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="technical"
                name="radio-buttons-group"
  >
              <FormControlLabel value="technical" control={<Radio />} label="Technical" />
              <FormControlLabel value="financial" control={<Radio />} label="Financial" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
              <br/>
              <Form.Label>Problem Description: </Form.Label>
              <textarea class="form-control" id="Description" rows="3" required="true"></textarea>
              <br/>
             
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleClose} >
            Close
          </Button>
          <Button color="primary" onClick={handleClose}>
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
            <Button className="btn" outline color="danger" onClick={handleShow}>Report Problem</Button>   
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
   


<Card className="final-results"  >

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

</Card>

 </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose1} >
      Close
    </Button>

    <Button variant="primary"  type='submit' onClick={handleSubmit}>
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





  

  









