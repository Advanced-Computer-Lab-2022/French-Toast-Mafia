import { Col, Row , Alert, CardDeck, Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button, CardGroup} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { getInstructor } from "../api/axios";
import {useState, useEffect } from 'react';
import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";


import Reviews from "../components/dashboard/CourseReviews";
import user2 from "../assets/images/users/user2.jpg";
import LatestReports from "../components/dashboard/LatestReports";
import CourseCard from "../components/dashboard/CourseCard";

const CreateCourse = () => {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    
    
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
      const { title, email, department, location, biography} = form
      const newErrors = {}

      if(!title || title === "")
      newErrors.title = "Please enter a course title"
      if(!email || email === "")  
      newErrors.id = "Please enter a valid id"
      if(!department || department === "")  
      newErrors.id = "Please enter a valid id"
      if(!location || location === "")  
      newErrors.id = "Please enter a valid id"
      if(!biography || biography === "")  
      newErrors.id = "Please enter a valid id"
      return newErrors
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formErrors = validateForm()

    if(Object.keys(formErrors).length > 0){
        setErrors(formErrors)
    }
    else{
        // await fetch(`http://localhost:5000/Instructor/editInstructorData?id=${id}`,{
        //     method: 'POST',
        //     body: JSON.stringify({"InstrName" : form.name, "InstrEmail": form.email, "InstrCountry" : form.location, "Department" : form.department, "Biography": form.biography}),
        //     headers : {
        //         'Content-Type':'application/json'
        //     }
        // })
        window.location.reload();
    }
}

    
  

  return (
    <div>
    
    <Card>
      <CardBody>
    <Form>      

             <CardTitle tag="h4" >Create new course:</CardTitle>
             <hr/>
             <Row>
             <Col lg="6">
             <Card>
                <CardBody>
                <CardTitle tag="h5" className="text-muted">Overview Details:</CardTitle>

                <hr/>
                <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Introduction to Javascript'"
                        value = {form.title}
                        onChange={(e) => setField('title', e.target.value)}
                        isInvalid={!!errors.title}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

                <br/>

                <Form.Group controlId="difficulty">
                <Form.Label>Difficulty:</Form.Label>
                    <Form.Select placeholder="Easy"
                        // type="text"
                        // placeholder="Enter id"
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
                </Form.Group>

                <br/>
               
                <Form.Group controlId="subject">
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Computer Science'"
                        value = {form.subject}
                        onChange={(e) => setField('subject', e.target.value)}
                        isInvalid={!!errors.subject}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.subject}
                    </Form.Control.Feedback>
                </Form.Group>

                <br/>

                <Form.Group controlId="summary">
                    <Form.Label>Summary:</Form.Label>
                    <Form.Control 
                    as='textarea'
                    rows={3}
                    type="textarea"
                    placeholder="Write a Summary"
                    value = {form.summary}
                    onChange={(e) => setField('summary', e.target.value)}
                    isInvalid={!!errors.summary}
                    ></Form.Control>
                     <Form.Control.Feedback type='invalid'>
                        {errors.summary}
                    </Form.Control.Feedback>
                </Form.Group>

                <br/>
                {/* </Col> */}
                </CardBody>
                </Card>
                </Col>
                <Col lg="6">
             <Card>
                <CardBody>
                <CardTitle tag="h5" className="text-muted">Overview Details:</CardTitle>

                <hr/>
                <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Introduction to Javascript'"
                        value = {form.title}
                        onChange={(e) => setField('title', e.target.value)}
                        isInvalid={!!errors.title}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

                <br/>

                <Form.Group controlId="difficulty">
                <Form.Label>Difficulty:</Form.Label>
                    <Form.Select placeholder="Easy"
                        // type="text"
                        // placeholder="Enter id"
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
                </Form.Group>

                <br/>
               
                <Form.Group controlId="subject">
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Computer Science'"
                        value = {form.subject}
                        onChange={(e) => setField('subject', e.target.value)}
                        isInvalid={!!errors.subject}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.subject}
                    </Form.Control.Feedback>
                </Form.Group>

                <br/>

                <Form.Group controlId="summary">
                    <Form.Label>Summary:</Form.Label>
                    <Form.Control 
                    as='textarea'
                    rows={3}
                    type="textarea"
                    placeholder="Write a Summary"
                    value = {form.summary}
                    onChange={(e) => setField('summary', e.target.value)}
                    isInvalid={!!errors.summary}
                    ></Form.Control>
                     <Form.Control.Feedback type='invalid'>
                        {errors.summary}
                    </Form.Control.Feedback>
                </Form.Group>

                <br/>
                {/* </Col> */}
                </CardBody>
                </Card>
                </Col>
                </Row>
                <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-end'}}>
                    <Form.Group controlId="submit">
                    <Button type="submit" color="primary" onClick={handleSubmit}>
                        Post
                    </Button>
                    </Form.Group>
                </div>
            
            </Form> 
        </CardBody>  
    </Card>
   
    
   
      </div>
  );
};

export default CreateCourse;
