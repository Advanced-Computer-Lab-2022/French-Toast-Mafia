import { Col, Row , Alert, CardDeck, Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button, CardGroup} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { getExercise} from "../api/axios";
import {useState, useEffect } from 'react';
import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Reviews from "../components/dashboard/CourseReviews";
import user2 from "../assets/images/users/user2.jpg";
import CourseCard from "../components/dashboard/CourseCard";

import { useNavigate } from "react-router-dom";

const ViewExercise = () => {
  const navigate = useNavigate();


    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    const [show, setShow] = useState(false);

    const[exercise, setExercise] = useState([])
    const[MCQ, setMCQ] = useState([])
    const[title, setTitle] = useState("Loading...")
    const[description, setDescription] = useState("Loading...")

    useEffect(() => {
        getExercise(id).then(json => {
            setExercise(json)
            setTitle(json.title);
            setDescription(json.description);
            setMCQ(json.mcq);
        })
      }, []);     

    var i = 1;
    
    const displayQuestions = MCQ.map((q) => {
        return(
        <>
        <hr/>
        
         <CardSubtitle tag="h5" className="text-muted">{i++}. &nbsp;{q.question}</CardSubtitle>
         <hr/>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={q.correct}
            name="radio-buttons-group"
                >
            <FormControlLabel value={q.choice1} control={<Radio />} label={q.choice1} disabled = {q.choice1 === q.correct? false : true}/>
            <FormControlLabel value={q.choice2} control={<Radio />} label={q.choice2} disabled = {q.choice2 === q.correct? false : true}/>
            <FormControlLabel value={q.choice3} control={<Radio />} label={q.choice3} disabled = {q.choice3 === q.correct? false : true}/>
            <FormControlLabel value={q.choice4} control={<Radio />} label={q.choice4} disabled = {q.choice4 === q.correct? false : true}/>
        </RadioGroup>
          <br/>
        </>
        )
    })







      
  return (
    <div>
        <Row>
    <Col lg="1"></Col>
      {/***Sales & Feed***/}
      <Col lg="10">
      <CardDeck>
        <Card >
          <CardBody>
      <Row>  
      
      <Card >
     
     <CardBody>
       <CardTitle tag="h4"> <span class="bi bi-pencil-square"></span> {title} </CardTitle>    
       <CardSubtitle tag="h5" className="text-muted">{description}</CardSubtitle>
       <hr/>

        {MCQ?.length? displayQuestions : null}

       </CardBody>
        </Card>
      </Row> 
      </CardBody>
      </Card>
      </CardDeck>
      </Col>
      </Row>
      {/***Table ***/}


      </div>
  );
};

export default ViewExercise;
