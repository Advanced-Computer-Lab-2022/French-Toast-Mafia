import { Container, Card, CardBody, CardTitle, CardSubtitle, Table,
    Row,Button,
    Col,
  } from "reactstrap";
  
  import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState, useEffect } from 'react';


  import Accordion from 'react-bootstrap/Accordion';
  import Subtitle from "./Subtitle";
  
  const EditCourseSubtitles = ({cId, subtitles}) => {

    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

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
        const { title, description} = form
        const newErrors = {}
  
        if(!title || title === "")
            newErrors.title = "Please enter a title"
        if(!description || description === "")  
            newErrors.description = "Please enter a description"
        return newErrors
    }
  
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      const formErrors = validateForm()
  
      if(Object.keys(formErrors).length > 0){
          setErrors(formErrors)
      }
      else{
          await fetch(`http://localhost:5000/Subtitle/addSubtitle?id=${cId}`,{
              method: 'POST',
              body: JSON.stringify({"Title" : form.title, "Description": form.description, "Duration" : form.duration}),
              headers : {
                  'Content-Type':'application/json'
              }
          }).then(json =>{
              window.location.reload();
            })
      }
  }
  


    return (
    <div>
      <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subtitle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Chapter 1'"
                        value = {form.title}
                        onChange={(e) => setField('title', e.target.value)}
                        isInvalid={!!errors.title}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

              <br/>
              <Form.Group controlId="duration">
                    <Form.Label>Duration (in Hours):</Form.Label>
                    <Form.Control 
                        type="number"
                        min="1"
                        defaultValue="1"
                        value = {form.duration}
                        onChange={(e) => setField('duration', e.target.value)}
                        isInvalid={!!errors.duration}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.duration}
                    </Form.Control.Feedback>
                </Form.Group>
              <br/>
 
                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                      <Form.Control 
                      as='textarea'
                      rows={3}
                      type="textarea"
                      placeholder="Write a Description"
                      value = {form.description}
                      onChange={(e) => setField('description', e.target.value)}
                      isInvalid={!!errors.description}
                      ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleClose} >
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Add Subtitle
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

      <div>
        <Card>
          <CardBody>
            <Row>
            <Col lg = "11">
            <CardTitle tag="h5">Course Subtitles</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">Overview of the Course</CardSubtitle>
            </Col>
            <Col lg = "1">
            <Button className="btn" outline color="primary"  size="sm" onClick={() => setShow(true)}>Add New</Button>
            </Col>
            </Row>
            <Row>
              <Col>
                  <div>
                      <Accordion className="accordion accordion-flush" defaultActiveKey="0">
                        {subtitles.map(s =>  <Subtitle subtitle={s}/>)}
                      </Accordion>
                  </div>
              </Col>
            </Row>
        </CardBody>
        </Card>
      </div>
    </div>
    );
  };
  
  export default EditCourseSubtitles;
  