import { Card, CardBody, CardSubtitle, CardText, CardImg, CardTitle, Button, Row, Col } from "reactstrap";
import {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, FormControl , FormLabel } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

// import Chart from "react-apexcharts";

const CourseInfo = ({course,instructor}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);     


  
  return (
      <div>
        
    <div>
      <Modal show={show} onHide={handleClose}>
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
      


      <Card>
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
        <CardText>Rating: {5} </CardText>
        <CardText>Subject: {course.Subject}</CardText>
        <CardText>Created by: {instructor} </CardText>
        <CardText className="text-muted">Last updated on: {course.updatedAt}</CardText>
        </Col>
        <Col className="text-end">
          <br/><br/><br/><br/><br/>
          <CardTitle tag="h4" className="text-primary">Price: {course.Cost} EGP</CardTitle>
          <Button className="btn" color="primary" size="lg" onClick={handleShow}>Register for Course</Button>   
          </Col>
        </Row>
     
      </CardBody>
    </Card>
</div>
    
  );
};

export default CourseInfo;
