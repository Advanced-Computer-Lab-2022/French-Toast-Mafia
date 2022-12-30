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
  import StripeCheckout from 'react-stripe-checkout';
  import Swal from 'sweetalert2';
  import withReactContent from 'sweetalert2-react-content';
  import { createContext } from 'react';
  
  
  
  
  // import Chart from "react-apexcharts";
  
  const EditCourseInfo = ({cId,course,instructor}) => {
    
    const[edit,setEdit] = useState(false);

    
    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});

    const setField = (field, value) =>{
        setForm({
            ...form,
            [field]:value,
        })
        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null,
        })
    }

    const validateForm = () =>{
      const { title, summary, difficulty, subject, price} = form
      const newErrors = {}

      if(!title || title === "")
          form.title = course.NameOfCourse
      if(!summary || summary === "")  
         form.summary = course.Summary
      if(!difficulty || difficulty === "")  
        form.difficulty = course.difficulty
      if(!subject || subject === "")  
        form.subject = course.Subject
      if(!price || price === "")  
        form.price = course.Cost
      return newErrors
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formErrors = validateForm()

    if(Object.keys(formErrors).length > 0){
        setErrors(formErrors)
    }
    else{
        await fetch(`http://localhost:5000/Course/editCourse?id=${cId}`,{
            method: 'POST',
            body: JSON.stringify({"NameOfCourse" : form.title, "LevelOfCourse": form.difficulty, "Summary" : form.summary, "Subject" : form.subject, "Cost": form.price, "Preview":form.preview}),
            headers : {
                'Content-Type':'application/json'
            }
        })
        window.location.reload();
    }
}

 const cTitle = <CardTitle tag="h4">{course.NameOfCourse}</CardTitle>

 const editTitle = 
        <Form.Group controlId="title">
          <div style={{ display: "flex", justifyContent: 'flex-end'}}>
          <Col lg="2">
          <Form.Label tag="h5" className="mt-3 text-muted ">Title:</Form.Label>
          </Col>
          <Form.Control 
                type="text"
                defaultValue={course.NameOfCourse}
                value = {form.title}
                onChange={(e) => setField('title', e.target.value)}
                isInvalid={!!errors.title}
            ></Form.Control>
        <Form.Control.Feedback type='invalid'>
            {errors.title}
        </Form.Control.Feedback>
        </div>
      </Form.Group>

      const cSummary =  <CardSubtitle className="text-muted" tag="h6"> {course.Summary}</CardSubtitle>


      const editSummary = <Form.Group controlId="summary">
      <div style={{ display: "flex", justifyContent: 'flex-end'}}>
      <Col lg="2">
      <Form.Label tag="h5" className="mt-3 text-muted ">Summary:</Form.Label>
      </Col>
      <Form.Control as='textarea'
            rows={2}
            type="textarea"
            defaultValue={course.Summary}
            value = {form.summary}
            onChange={(e) => setField('summary', e.target.value)}
            isInvalid={!!errors.summary}
        ></Form.Control>
    <Form.Control.Feedback type='invalid'>
        {errors.summary}
    </Form.Control.Feedback>
    </div>
  </Form.Group>

  const editDifficulty =    <Form.Group controlId="status">
     <div style={{ display: "flex", justifyContent: 'flex-end'}}>
      <Col lg="2">
      <Form.Label tag="h5" className="mt-3 text-muted ">Difficulty:</Form.Label>
      </Col>
    <Form.Select defaultValue={course.LevelOfCourse}
        value = {form.difficulty}
        onChange={(e) => setField('difficulty', e.target.value)}
        isInvalid={!!errors.difficulty}
    >
        <option value = "Easy">Easy</option>
        <option value = "Medium">Medium</option>
        <option value = "Hard">Hard</option>
    </Form.Select>
    <Form.Control.Feedback type='invalid'>
        {errors.difficulty}
    </Form.Control.Feedback>
    </div>
    </Form.Group>

    const cDifficulty = <CardText>Difficulty: {course.LevelOfCourse}</CardText>


    const cPreview =  <CardText>Preview: {course.Preview}</CardText>


    const editPreview = <Form.Group controlId="preview">
    <div style={{ display: "flex", justifyContent: 'flex-end'}}>
    <Col lg="2">
    <Form.Label tag="h5" className="mt-3 text-muted ">Preview:</Form.Label>
    </Col>
    <Form.Control 
          type="text"
          defaultValue={course.Preview}
          value = {form.preview}
          onChange={(e) => setField('preview', e.target.value)}
          isInvalid={!!errors.preview}
      ></Form.Control>
  <Form.Control.Feedback type='invalid'>
      {errors.preview}
  </Form.Control.Feedback>
  </div>
</Form.Group>

    const cPrice = <CardTitle tag="h4" className="text-primary">Price: {course.Cost} EGP</CardTitle>
    
    const editPrice =  <Form.Group controlId="Price">
    <div style={{ display: "flex", justifyContent: 'flex-end'}}>
    <Col lg="2">
    <Form.Label tag="h5" className="mt-3 text-muted ">Price:</Form.Label>
    </Col>
    <Form.Control 
          type="number"
          defaultValue={course.Cost}
          min = "0"
          value = {form.price}
          onChange={(e) => setField('price', e.target.value)}
          isInvalid={!!errors.price}
      ></Form.Control>
  <Form.Control.Feedback type='invalid'>
      {errors.price}
  </Form.Control.Feedback>
  </div>
</Form.Group>
    
    const editButton = <Button className="btn" outline color="primary" onClick={()=> setEdit(true)}><span class="bi bi-pencil-square"></span></Button>

    const submitButton = <Button className="btn" outline color="primary" onClick={handleSubmit}>Update</Button>

  
    return (
        <div>
    
      <Card>
        <CardBody style={{height: "350px"}}>
  
          <Row>
            <Col lg="10">
            {edit? editTitle : cTitle}
            {edit? editSummary : cSummary}
             
            </Col>
            <Col>
            {edit? submitButton : editButton}
            </Col>
          </Row>
         
          <br/>
          <Row>
          <Col lg="10">
            {edit? editDifficulty : cDifficulty}
            {!edit? <CardText> <CardText tag="h6"><span class="bi bi-clock"></span> &nbsp;{course.Duration? course.Duration : "N/A"} hours</CardText></CardText> : null}
            {edit? editPreview : cPreview}
            {edit? editPrice : cPrice}
       
          {edit? null :   <CardText className="text-muted">Last updated on: {course.updatedAt}</CardText>}
        
          </Col>
          <Col className="text-end">
           
            <h1>  </h1>
            </Col>
  
          </Row>
  
        </CardBody>
      </Card>
  
  </div>
      
    );
  };
  
  export default EditCourseInfo;
  
  
  
  
  
    
  
    
  
  
  
  
  
  
  
  
  
  