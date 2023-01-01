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
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

 
  const SubtitleEdit = ({subtitle}) => {
    const [id, setId] = useState("");
    const [sub,setSub] = useState([])
    const [video,setVideo] = useState([1])
    const [Exercise,setExercise] = useState([])
    const [toggleExercises,setToggleExercises] = useState(false)
   
    const search = useLocation().search;
    const courseId = new URLSearchParams(search).get('id');
    const userId = new URLSearchParams(search).get('userId');


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
                    
                        </Col>
                      </Row>
                      {toggleExercises? exerciseList : null}
                      </Accordion.Body>

    return (
      <div>

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
            <Col lg="2">
            <span class="bi bi-play-btn"></span>  {video?.length? video.length : "0"} Video(s)  
            </Col> 
            <Col lg="7">
            {video?.length? <Button className="btn" color="link" size="sm" onClick = "" >Open Videos</Button> : null}
            </Col>
            <Col lg="2">
       
            </Col>
            </Row>
               </Accordion.Body>
          {Exercise?.length? yesExercises : noExercises}
           
        </Accordion.Item>
      </div>
    );
  };
  
export default SubtitleEdit;
  