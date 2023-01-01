import Accordion from 'react-bootstrap/Accordion';
import { Card, CardBody, CardSubtitle, CardText, CardImg, CardTitle, Button, Row, Col , ListGroup,
} from "reactstrap";
import {useState, useEffect} from 'react';
import { viewSubtitle } from '../../api/axios';
import ExerciseList from '../dashboard/exerciseList';

import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

  const SubtitleEdit = ({subtitle}) => {
    const [id, setId] = useState("");
    const [sub,setSub] = useState([])
    const [video,setVideo] = useState([1])
    const [Exercise,setExercise] = useState([])
    const [toggleExercises,setToggleExercises] = useState(false)
   
    var i = 0;
    useEffect(() => {
        viewSubtitle(subtitle).then(json => {
        setSub(json)
        setId(json._id)
        setVideo(json.Video)
        setExercise(json.Exercise)
        })
      }, []);

      const exerciseList = 
      <>
      <Row>
      <Col lg= "1"></Col>
      <Col>
      <ListGroup>
      <ExerciseList exercises = {Exercise}/>
      </ListGroup>
      </Col>
      </Row>
      </>
     
     
    
     
const noExercises =  <Accordion.Body>
                    <Row>
                    <Col lg="1"></Col>
                    <Col lg="9">
                    <span class="bi bi-pencil-square"></span> 0 Exercise(s) 
                    </Col> 
                    <Col lg="2">
                    <Button className="btn" outline color="primary"  size="sm" onClick={() => setShowExerciseForm(true)}>Add Exercise</Button>
                    </Col>
                    </Row>
                    </Accordion.Body>

const exShowMore =  <Button className="btn" color="link" size="sm" onClick={() => setToggleExercises(!toggleExercises)}>Show more</Button>
const exShowLess =  <Button className="btn" color="link" size="sm" onClick={() => setToggleExercises(!toggleExercises)}>Show less</Button>

const yesExercises =  <Accordion.Body>
                      <Row>
                        <Col lg="1"></Col>
                          <Col lg="2">
                            <span class="bi bi-pencil-square"></span> {Exercise.length} Exercise(s) 
                          </Col> 
                          <Col lg="7">
                            {toggleExercises? exShowLess : exShowMore}
                          </Col>
                        <Col lg="2">
                          <Button className="btn" outline color="primary"  size="sm" onClick={() => setShowExerciseForm(true)}>Add Exercise</Button>
                        </Col>
                      </Row>
                      {toggleExercises? exerciseList : null}
                      </Accordion.Body>

  const[Exform, setExForm] = useState({});
  const[Exerrors, setExErrors] = useState({});
  const[Vform, setVForm] = useState({});
  const[Verrors, setVErrors] = useState({});

  const[showExerciseForm, setShowExerciseForm] = useState(false);
  const[showVideoForm, setShowVideoForm] = useState(false);


  const handleCloseExerciseForm = () => setShowExerciseForm(false);
  const handleCloseVideoForm = () => setShowVideoForm(false);

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

const setVField = (field, value) =>{
  setVForm({
      ...Vform,
      [field]:value,
  })
  if(!!Verrors[field])
  setVErrors({
      ...Verrors,
      [field]:null,
  })
}

const validateExForm = () =>{
  const { title, description, q1, q1c1, q1c2, q1c3, q1c4, cc1,
    q2, q2c1, q2c2, q2c3, q2c4, cc2,
    q3, q3c1, q3c2, q3c3, q3c4, cc3,
    q4, q4c1, q4c2, q4c3, q4c4, cc4} = Exform

  const newErrors = {}

  if(!title || title === "")
    newErrors.title = "Please enter a title"
  if(!description || description === "")
    newErrors.description = "Please enter a description"

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

  if(Exform.number >= 2){
    if(!q2 || q2 === "")  
      newErrors.q2 = "Please enter a question"
    if(!q2c1 || q2c1 === "")  
      newErrors.q2c1 = "Please enter a choice"
    if(!q2c2 || q2c2 === "")  
      newErrors.q2c2 = "Please enter a choice"
    if(!q2c3|| q2c3 === "")  
      newErrors.q2c3 = "Please enter a choice"
    if(!q2c4 || q2c4 === "")  
      newErrors.q2c4 = "Please enter a choice"
    if(!cc2 || cc2 === "")  
      Exform.cc2 = "1";
  }

  if(Exform.number >= 3){
    if(!q3 || q3 === "")  
      newErrors.q3 = "Please enter a question"
    if(!q3c1 || q3c1 === "")  
      newErrors.q3c1 = "Please enter a choice"
    if(!q3c2 || q3c2 === "")  
      newErrors.q3c2 = "Please enter a choice"
    if(!q3c3|| q3c3 === "")  
      newErrors.q2c3 = "Please enter a choice"
    if(!q3c4 || q3c4 === "")  
      newErrors.q3c4 = "Please enter a choice"
    if(!cc3 || cc3 === "")  
        Exform.cc3 = "1";
    }

    if(Exform.number >= 4){
      if(!q4 || q4 === "")  
        newErrors.q4 = "Please enter a question"
      if(!q4c1 || q4c1 === "")  
        newErrors.q4c1 = "Please enter a choice"
      if(!q4c2 || q4c2 === "")  
        newErrors.q4c2 = "Please enter a choice"
      if(!q4c3|| q4c3 === "")  
        newErrors.q4c3 = "Please enter a choice"
      if(!q4c4 || q4c4 === "")  
        newErrors.q4c4 = "Please enter a choice"
      if(!cc4 || cc4 === "")  
        Exform.cc4 = "1";
    }
    return newErrors
  }
  
  const validateVForm = () =>{
    const { link } = Vform
  
    const newErrors = {}
  
    if(!link || link === "")
      newErrors.link = "Please enter a video link"
  
      return newErrors
    }


const handleSubmitExerciseForm = async (e) => {
  
  e.preventDefault();

  const formErrors = validateExForm()

  if(Object.keys(formErrors).length > 0){
      setExErrors(formErrors)
  }
  else{
    console.log("Hurray!")
    console.log(Exform.q1)
    console.log(Exform.q1c1)
    console.log(Exform.q1c2)
    console.log(Exform.q1c3)
    console.log(Exform.q1c4)
    console.log(Exform[`q1c${Exform.cc1}`])

      await fetch(`http://localhost:5000/Exams/createExercise?id=${id}`,{
          method: 'POST',
          body: JSON.stringify({"title" : Exform.title, "description": Exform.description, "question" : Exform.q1, "choice1":Exform.q1c1, "choice2":Exform.q1c2, "choice3":Exform.q1c3, "choice4":Exform.q1c4, "correct":Exform[`q1c${Exform.cc1}`]}),
          headers : {
              'Content-Type':'application/json'
          }
      }).then(response => {return (response.json())}).then(data =>{  
          if(Exform.number >= 2){
              fetch(`http://localhost:5000/Exams/addMCQ?id=${data}`,{
              method: 'POST',
              body: JSON.stringify({"title" : Exform.title, "description": Exform.description, "question" : Exform.q2, "choice1":Exform.q1c1, "choice2":Exform.q2c2, "choice3":Exform.q2c3, "choice4":Exform.q2c4, "correct":Exform[`q2c${Exform.cc2}`]}),
              headers : {
                  'Content-Type':'application/json'
              }
          }).then(res1 =>{
              if(Exform.number >= 3){
                  fetch(`http://localhost:5000/Exams/addMCQ?id=${data}`,{
                  method: 'POST',
                  body: JSON.stringify({"question" : Exform.q3, "choice1":Exform.q3c1, "choice2":Exform.q3c2, "choice3":Exform.q3c3, "choice4":Exform.q3c4, "correct":Exform[`q3c${Exform.cc3}`]}),
                  headers : {
                      'Content-Type':'application/json'
                  }
                }).then(res2 =>{
                  if(Exform.number >= 4){
                      fetch(`http://localhost:5000/Exams/addMCQ?id=${data}`,{
                      method: 'POST',
                      body: JSON.stringify({"question" : Exform.q4, "choice1":Exform.q4c1, "choice2":Exform.q4c2, "choice3":Exform.q4c3, "choice4":Exform.q4c4, "correct":Exform[`q4c${Exform.cc4}`]}),
                      headers : {
                          'Content-Type':'application/json'
                      }
                    })
                  }
                  else{
                    window.location.reload();
                  }
                })
              }
              else{
                window.location.reload();
              }
          })
        }
          window.location.reload(); 
    })  
  }
}

const handleSubmitVideoForm = async (e) => {
  
  e.preventDefault();

  const formErrors = validateVForm()

  if(Object.keys(formErrors).length > 0){
      setVErrors(formErrors)
  }
  else{
      await fetch(`http://localhost:5000/Subtitle/addVideo?id=${id}`,{
          method: 'POST',
          body: JSON.stringify({"Video" : Vform.link}),
          headers : {
              'Content-Type':'application/json'
          }
      }).then(json =>{
          window.location.reload();
    })
  }
}

const q2 =  <>
      <Modal.Body>
      <hr/><hr/>
      <Form.Group controlId='q2'>
          <Form.Label style={{ fontSize: '20px' }}>Question 2: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. 'What is 2 + 2?'"
              value = {Exform.q2}
              onChange={(e) => setExField("q2", e.target.value)}
              isInvalid={!!Exerrors.q2}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q2}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q2c1'>
          <Form.Label>Choice 1: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '4'"
              value = {Exform.q2c1}
              onChange={(e) => setExField("q2c1", e.target.value)}
              isInvalid={!!Exerrors.q2c1}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q2c1}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q2c2'>
          <Form.Label>Choice 2: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '8'"
              value = {Exform.q2c2}
              onChange={(e) => setExField("q2c2", e.target.value)}
              isInvalid={!!Exerrors.q2c2}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q2c2}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q2c3'>
          <Form.Label>Choice 3: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '12'"
              value = {Exform.q2c3}
              onChange={(e) => setExField("q2c3", e.target.value)}
              isInvalid={!!Exerrors.q2c3}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q2c3}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q2c4'>
          <Form.Label>Choice 4: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '0'"
              value = {Exform.q2c4}
              onChange={(e) => setExField("q2c4", e.target.value)}
              isInvalid={!!Exerrors.q2c4}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q2c4}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId="cc2">
              <Form.Label>Correct Choice:</Form.Label>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
  >           <Row>
                  <Col>
                    <FormControlLabel value="1" control={<Radio />} label="1" onChange={(e) => setExField('cc2', e.target.value)} />
                  </Col>
                  <Col>
                    <FormControlLabel value="2" control={<Radio />} label="2" onChange={(e) => setExField('cc2', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="3" control={<Radio />} label="3" onChange={(e) => setExField('cc2', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="4" control={<Radio />} label="4" onChange={(e) => setExField('cc2', e.target.value)}/>
                  </Col>
                </Row>
              </RadioGroup>
            </Form.Group>
      </Modal.Body>
      </>

const q3 =  <>
      <Modal.Body>
      <hr/><hr/>
      <Form.Group controlId='q3'>
          <Form.Label style={{ fontSize: '20px' }}>Question 3: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. 'What is 2 + 2?'"
              value = {Exform.q3}
              onChange={(e) => setExField("q3", e.target.value)}
              isInvalid={!!Exerrors.q3}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q3}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q3c1'>
          <Form.Label>Choice 1: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '4'"
              value = {Exform.q3c1}
              onChange={(e) => setExField("q3c1", e.target.value)}
              isInvalid={!!Exerrors.q3c1}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q3c1}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q3c2'>
          <Form.Label>Choice 2: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '8'"
              value = {Exform.q3c2}
              onChange={(e) => setExField("q3c2", e.target.value)}
              isInvalid={!!Exerrors.q3c2}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q3c2}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q3c3'>
          <Form.Label>Choice 3: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '12'"
              value = {Exform.q3c3}
              onChange={(e) => setExField("q3c3", e.target.value)}
              isInvalid={!!Exerrors.q3c3}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q3c3}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q3c4'>
          <Form.Label>Choice 4: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '0'"
              value = {Exform.q3c4}
              onChange={(e) => setExField("q3c4", e.target.value)}
              isInvalid={!!Exerrors.q3c4}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q3c4}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId="cc3">
              <Form.Label>Correct Choice:</Form.Label>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
  >           <Row>
                  <Col>
                    <FormControlLabel value="1" control={<Radio />} label="1" onChange={(e) => setExField('cc3', e.target.value)} />
                  </Col>
                  <Col>
                    <FormControlLabel value="2" control={<Radio />} label="2" onChange={(e) => setExField('cc3', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="3" control={<Radio />} label="3" onChange={(e) => setExField('cc3', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="4" control={<Radio />} label="4" onChange={(e) => setExField('cc3', e.target.value)}/>
                  </Col>
                </Row>
              </RadioGroup>
            </Form.Group>
      </Modal.Body>
      </>

const q4 =  <>
      <Modal.Body>
      <hr/><hr/>
      <Form.Group controlId='q4'>
          <Form.Label style={{ fontSize: '20px' }}>Question 4: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. 'What is 2 + 2?'"
              value = {Exform.q4}
              onChange={(e) => setExField("q4", e.target.value)}
              isInvalid={!!Exerrors.q4}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q4}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q4c1'>
          <Form.Label>Choice 1: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '4'"
              value = {Exform.q4c1}
              onChange={(e) => setExField("q4c1", e.target.value)}
              isInvalid={!!Exerrors.q4c1}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q4c1}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q4c2'>
          <Form.Label>Choice 2: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '8'"
              value = {Exform.q4c2}
              onChange={(e) => setExField("q4c2", e.target.value)}
              isInvalid={!!Exerrors.q4c2}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q4c2}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q4c3'>
          <Form.Label>Choice 3: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '12'"
              value = {Exform.q4c3}
              onChange={(e) => setExField("q4c3", e.target.value)}
              isInvalid={!!Exerrors.q4c3}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q4c3}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId='q4c4'>
          <Form.Label>Choice 4: </Form.Label>
          <Form.Control 
              type="text"
              placeholder="Ex. '0'"
              value = {Exform.q4c4}
              onChange={(e) => setExField("q4c4", e.target.value)}
              isInvalid={!!Exerrors.q4c4}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
              {Exerrors.q4c4}
          </Form.Control.Feedback>
      </Form.Group>
      <br/>
      <Form.Group controlId="cc4">
              <Form.Label>Correct Choice:</Form.Label>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
  >           <Row>
                  <Col>
                    <FormControlLabel value="1" control={<Radio />} label="1" onChange={(e) => setExField('cc4', e.target.value)} />
                  </Col>
                  <Col>
                    <FormControlLabel value="2" control={<Radio />} label="2" onChange={(e) => setExField('cc4', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="3" control={<Radio />} label="3" onChange={(e) => setExField('cc4', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="4" control={<Radio />} label="4" onChange={(e) => setExField('cc4', e.target.value)}/>
                  </Col>
                </Row>
              </RadioGroup>
            </Form.Group>
      </Modal.Body>
      </>

    return (
      <div>
    <div>
      <Modal style ={{maxHeight : "750px" ,overflowY: 'scroll'}} show={showVideoForm} onHide={handleCloseVideoForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group controlId='link'>
                    <Form.Label>Link: </Form.Label>
                    <Form.Control 
                        type="text"
                        value = {Exform.link}
                        onChange={(e) => setVField("link", e.target.value)}
                        isInvalid={!!Verrors.link}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {Verrors.link}
                    </Form.Control.Feedback>
                </Form.Group>
          </Form>
        </Modal.Body>
  
        <Modal.Footer>
          <Button outline color="danger" onClick={handleCloseVideoForm} >
            Close
          </Button>
          <Button color="primary" onClick={handleSubmitVideoForm}>
            Add Video
          </Button>
        </Modal.Footer>
      </Modal>
      </div>






      <div>
      <Modal style ={{maxHeight : "750px" ,overflowY: 'scroll'}} show={showExerciseForm} onHide={handleCloseExerciseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group controlId='title'>
                    <Form.Label>Title: </Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Embedded system types'"
                        value = {Exform.title}
                        onChange={(e) => setExField("title", e.target.value)}
                        isInvalid={!!Exerrors.title}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {Exerrors.title}
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
                      value = {Exform.description}
                      onChange={(e) => setExField('description', e.target.value)}
                      isInvalid={!!Exerrors.description}
                      ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {Exerrors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="number">
                <Form.Label>Number of questions:</Form.Label>
                    <Form.Select placeholder="1"
                        // type="text"
                        defaultValue="1"
                        value = {Exform.number}
                        onChange={(e) => setExField("number", e.target.value)}
                        >
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {Exerrors.number}
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>

                <hr/>
                <hr/>
                <Form.Group controlId='q1'>
                    <Form.Label style={{ fontSize: '20px' }}>Question 1: </Form.Label>
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
        {Exform.number >= 2? q2 : null}
        {Exform.number >=3? q3 : null}
        {Exform.number >=4? q4 : null}

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




        <Accordion.Item eventKey={sub._id}>
            <Accordion.Header>
                <Col>
                    {sub.Title}
                </Col> 
                <Col>
                    <CardText className="text-muted" tag="h6"><span class="bi bi-clock"></span> &nbsp;{sub.Duration} hour(s) to complete</CardText>
                </Col>
            </Accordion.Header>
            <Accordion.Body>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="bi bi-text-center"></i>&nbsp;{sub.Description}
            </Accordion.Body>
            <Accordion.Body>
            <Row>            
            <Col lg="1"></Col>
            <Col lg="9">
            <span class="bi bi-play-btn"></span>  {video?.length? video.length : "0"} video(s)  
            </Col> 
            <Col lg="2">
            <Button className="btn" outline color="primary"  size="sm" onClick={() => setShowVideoForm(true)}>Add Video</Button>
            </Col>
            </Row>
               </Accordion.Body>
          {Exercise?.length? yesExercises : noExercises}
           
        </Accordion.Item>
      </div>
    );
  };
  
  export default SubtitleEdit;
  