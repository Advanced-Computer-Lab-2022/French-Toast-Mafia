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
import axios from "axios"

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';

import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



// import Chart from "react-apexcharts";

const OpenCourseInfo = ({uId, cId, course,instructor,ratingLength, setReportAlert, setReviewAlert}) => {

  const search = useLocation().search;

    const userId = new URLSearchParams(search).get('userId');

  const [showRep, setShowRep] = useState(false);
  const [showRev, setShowRev] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [problemType, setProblemType] = useState("Technical");
  const [description, setDescription] = useState("");
  const [reportedBy ,setReportedBy] = useState("");
  const [rating, setRating] = useState("1");
  const [review, setReview] = useState("");
  
  const reportData = {};

  const reviewData = {};

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  let stars = [];

  for (var i = 0; i < parseInt(course.avgRating); i++) {
    stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
    if (((course.avgRating)-parseInt(course.avgRating)) >0){
      stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
    }
}

  const handleClose = () => setShowRep(false);
  const handleCloseRev = () => setShowRev(false);
 

  const handleShow = () => setShowRep(true);
  const handleShowRev = () => setShowRev(true);
 

  const navigate = useNavigate();


  const handleReportSubmit = async(req , res) => {
    reportData["type"] = problemType;
    reportData["description"] = description;
    reportData["reported_by"] = userId;

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

  const handleReviewSubmit = async(req , res) => {
    reviewData["id"] = userId;
    reviewData["rating"] = rating;
    reviewData["review"] = review;

    console.log(reviewData)
    console.log(cId)

    await fetch(`http://localhost:5000/Course/addCourseRating?id=${cId}`,{
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers : {
            'Content-Type':'application/json'
        }
    }).then(json =>{
    handleCloseRev()
    return setReviewAlert(true)
    })

  }


  return (
      <div>
     
    <div>
      <Modal show={showRep}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="problemReport">
  
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

      <div>
      <Modal show={showRev}  onHide={handleCloseRev}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="problemReport">
             
            <Form.Label>Rating:</Form.Label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="1"
                name="radio-buttons-group"
  >
              <FormControlLabel value="1" control={<Radio />} label="1" onChange={(e) => setRating("1")} />
              <FormControlLabel value="2" control={<Radio />} label="2" onChange={(e) => setRating("2")}/>
              <FormControlLabel value="3" control={<Radio />} label="3" onChange={(e) => setRating("3")}/>
              <FormControlLabel value="4" control={<Radio />} label="4" onChange={(e) => setRating("4")} />
              <FormControlLabel value="5" control={<Radio />} label="5" onChange={(e) => setRating("5")}/>
          
            </RadioGroup>
              <br/>
              <Form.Label>Review: </Form.Label>
              <Input
              type="textarea"
              id="description" rows="3" required="true" onChange={(e) => setReview(e.target.value)}/>
              <br/>
             
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleCloseRev} >
            Close
          </Button>
          <Button color="primary" onClick={handleReviewSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      


    <Card>

      <CardBody style={{height: "300px"}}>

        <Row>
          <Col lg = "10">
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

           <Button outline color="primary" onClick={handleShowRev}>Review Course</Button> 
          <h1>  </h1>
    
          </Col>

        </Row>

      </CardBody>
    </Card>

   

</div>
    
  );
};

export default OpenCourseInfo;





  

  









