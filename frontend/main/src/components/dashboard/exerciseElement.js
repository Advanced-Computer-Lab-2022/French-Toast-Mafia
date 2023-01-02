import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import { getExercise } from "../../api/axios";
import {useState, useEffect} from 'react';
import {Form} from "react-bootstrap"
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';


const ExerciseElement = ({eId}) => {

 
    const [exercise, setExercise] = useState([]);
    const [mcq, setMCQ] = useState([]);
    const [title, setTitle] = useState("Loading...");
    const [MCQShow, setMCQShow] = useState(false);
    const[Exform, setExForm] = useState({});
    const[Exerrors, setExErrors] = useState({});
    const[showExerciseForm, setShowExerciseForm] = useState(false);

    const handleCloseExerciseForm = () => setShowExerciseForm(false);
    // console.log(eId)
    // var typeIcon;
    // var statusColor;

    const navigate = useNavigate();

    useEffect(() => {
        if(eId != null)
            getExercise(eId).then(json => {
            setExercise(json)
            setTitle(json.title);
        })
      }, []);
      

      const setExField = (field, value) =>{
        setExForm({
            ...Exform,
            [field]:value,
        })
        if(!!Exerrors[field])
        setExErrors({
            ...Exerrors,
            [field]:null,
        })
    }
    const validateExForm = () =>{
      const {q1, q1c1, q1c2, q1c3, q1c4, cc1 } = Exform
    
      const newErrors = {}
      
      if(!q1 || q1 === "")  
        newErrors.q1 = "Please enter a question"
      if(!q1c1 || q1c1 === "")  
        newErrors.q1c1 = "Please enter a choice"
      if(!q1c2 || q1c2 === "")  
        newErrors.q1c2 = "Please enter a choice"
      if(!q1c3|| q1c3 === "")  
        newErrors.q1c3 = "Please enter a choice"
      if(!q1c4 || q1c4 === "")  
        newErrors.q1c4 = "Please enter a choice"
      if(!cc1 || cc1 === "")  
        Exform.cc1 = "1";
  
        return newErrors
      }
      
    
    
    const handleSubmitExerciseForm = async (e) => {
      
      e.preventDefault();
    
      const formErrors = validateExForm()
    
      if(Object.keys(formErrors).length > 0){
          setExErrors(formErrors)
      }
    
      else{
          await fetch(`http://localhost:5000/Exams/addMCQ?id=${eId}`,{
              method: 'POST',
              body: JSON.stringify({"question" : Exform.q1, "choice1":Exform.q1c1, "choice2":Exform.q1c2, "choice3":Exform.q1c3, "choice4":Exform.q1c4, "correct":Exform[`q1c${Exform.cc1}`]}),
              headers : {
                  'Content-Type':'application/json'
              }
          }).then(response => { 
            handleCloseExerciseForm()
            window.location.reload();
          })
      }       
    }
  
  return (
   <>
    <div>
    <Modal style ={{maxHeight : "750px" ,overflowY: 'scroll'}} show={showExerciseForm} onHide={handleCloseExerciseForm}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
           
              <Form.Group controlId='q1'>
                  <Form.Label style={{ fontSize: '20px' }}>Question: </Form.Label>
                  <Form.Control 
                      type="text"
                      placeholder="Ex. 'What is 2 + 2?'"
                      value = {Exform.q1}
                      onChange={(e) => setExField("q1", e.target.value)}
                      isInvalid={!!Exerrors.q1}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                      {Exerrors.q1}
                  </Form.Control.Feedback>
              </Form.Group>
              <br/>
              <Form.Group controlId='q1c1'>
                  <Form.Label>Choice 1: </Form.Label>
                  <Form.Control 
                      type="text"
                      placeholder="Ex. '4'"
                      value = {Exform.q1c1}
                      onChange={(e) => setExField("q1c1", e.target.value)}
                      isInvalid={!!Exerrors.q1c1}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                      {Exerrors.q1c1}
                  </Form.Control.Feedback>
              </Form.Group>
              <br/>
              <Form.Group controlId='q1c2'>
                  <Form.Label>Choice 2: </Form.Label>
                  <Form.Control 
                      type="text"
                      placeholder="Ex. '8'"
                      value = {Exform.q1c2}
                      onChange={(e) => setExField("q1c2", e.target.value)}
                      isInvalid={!!Exerrors.q1c2}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                      {Exerrors.q1c2}
                  </Form.Control.Feedback>
              </Form.Group>
              <br/>
              <Form.Group controlId='q1c3'>
                  <Form.Label>Choice 3: </Form.Label>
                  <Form.Control 
                      type="text"
                      placeholder="Ex. '12'"
                      value = {Exform.q1c3}
                      onChange={(e) => setExField("q1c3", e.target.value)}
                      isInvalid={!!Exerrors.q1c3}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                      {Exerrors.q1c3}
                  </Form.Control.Feedback>
              </Form.Group>
              <br/>
              <Form.Group controlId='q1c4'>
                  <Form.Label>Choice 4: </Form.Label>
                  <Form.Control 
                      type="text"
                      placeholder="Ex. '0'"
                      value = {Exform.q1c4}
                      onChange={(e) => setExField("q1c4", e.target.value)}
                      isInvalid={!!Exerrors.q1c4}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                      {Exerrors.q1c4}
                  </Form.Control.Feedback>
              </Form.Group>
              <br/>
            
          <Form.Group controlId="cc1">
            <Form.Label>Correct Choice:</Form.Label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="1"
                name="radio-buttons-group"
>           <Row>
                <Col>
                  <FormControlLabel value="1" control={<Radio />} label="1" onChange={(e) => setExField('cc1', e.target.value)} />
                </Col>
                <Col>
                  <FormControlLabel value="2" control={<Radio />} label="2" onChange={(e) => setExField('cc1', e.target.value)}/>
                </Col>
                <Col>
                  <FormControlLabel value="3" control={<Radio />} label="3" onChange={(e) => setExField('cc1', e.target.value)}/>
                </Col>
                <Col>
                  <FormControlLabel value="4" control={<Radio />} label="4" onChange={(e) => setExField('cc1', e.target.value)}/>
                </Col>
              </Row>
            </RadioGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
  

      <Modal.Footer>
        <Button outline color="danger"onClick={handleCloseExerciseForm} >
          Close
        </Button>
        <Button color="primary" onClick={handleSubmitExerciseForm}>
          Add Exercise
        </Button>
      </Modal.Footer>
    </Modal>
    </div>

            <ListGroupItem
            key={eId}
            action
            tag="a"
            className=" align-items-center border-0"
          >
            <Row>
             
            <Col lg="3">
            
           <span class="bi bi-pencil-square"></span> &nbsp;&nbsp;{title}
            </Col>
            <Col lg="3">
            <Button outline color="primary"
            onClick={() => navigate(`/viewExercise?id=${eId}`)}
            >View</Button>
            </Col>
            <Col>
            <Button outline color="secondary" onClick={() => setShowExerciseForm(true)}>Add Another Question</Button>
            </Col>
          
            </Row>
          </ListGroupItem>  
    </>      
  )
};

export default ExerciseElement;