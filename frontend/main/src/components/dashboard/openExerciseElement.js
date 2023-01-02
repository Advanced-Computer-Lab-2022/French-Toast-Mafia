import axios from 'axios';
import React from "react";
import {

  ListGroupItem,
  Button,
  Col, Row,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import { getExercise, getGrade } from "../../api/axios";
import {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Modal from "react-bootstrap/Modal";


const OpenExerciseElement = ({eId, cId, uId}) => {
 
    const [exercise, setExercise] = useState([]);
    const [mcq, setMCQ] = useState([]);
    const [title, setTitle] = useState("Loading...");
    const [avGrade, setAvGrade] = useState(0);
    const [show, setShow] = useState(false);
    const handleCancel = () => setShow(false);
    
    const [grades,setGrades] = useState([]);
    // console.log(eId)
    // var typeIcon;
    // var statusColor;

    const navigate = useNavigate();

    useEffect(() => {
        if(eId != null && uId != null)
            getExercise(eId).then(json => {
            setExercise(json)
            setTitle(json.title);
        })
       
    
        axios.get(`http://localhost:5000/User/getUserGrades?id=${uId}&examId=${eId}`).then(
          (res) => {
              const resGrades = res.data;
              // console.log(resGrades);
              setGrades(resGrades);
          }
      );

    

    
        axios.get(`http://localhost:5000/Exams/getAverageGrade?id=${eId}`).then(
            (res) => {
                const avGrade = res.data.averageGrade
                console.log(res.data)
                setAvGrade(avGrade)
            }
        )


      // setShow(true)
    // }

          
            // getGrade(uId, eId).then(json =>{
            //   setGrades(json);
            //   console.log(json)
              
            

      }, []);



      // const getGrade = () => {
      // if(eId != null && uId != null)
      //   axios.get(`http://localhost:5000/User/getUserGrades?id=${uId}&examId=${eId}`).then(
      //       (res) => {
      //           const resGrades = res.data;
      //           console.log(resGrades);
      //           setGrades(resGrades);
      //       }
      //   );
  
       
      // }
    
  
  return (
<>
    <Modal
        show={show}
        onHide={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header closeButton>
          <Modal.Title>Exam Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 17,mb:3}}>
            Your exam grade is: <strong>{grades} %</strong>
          </Typography>

        </Modal.Body>


      </Modal>


   
            <ListGroupItem
              key={eId}
              action
              // onClick={() => navigate(`/viewExercise?id=${eId}`)}
              tag="a"
              className=" align-items-center border-0"
            >
              <Row>
               
              <Col lg="3">
              
             <span class="bi bi-pencil-square"></span> &nbsp;&nbsp;{title}
              </Col>
              <Col lg="3">
              <Button outline color="primary"
              onClick={() =>navigate(`/ViewExam?courseId=${cId}&userId=${uId}&examId=${eId}`)}
              >Enter Exercise</Button>
              </Col>
              <Col>
              <Button outline color="secondary" onClick={() => setShow(true)}>View Grade</Button>
              </Col>
              <Col>
              <small className="ms-auto text-muted text-small">
                Average Grade: {avGrade}
              </small>
              </Col>
              </Row>
            </ListGroupItem>
        </>      
  )
};

export default OpenExerciseElement;