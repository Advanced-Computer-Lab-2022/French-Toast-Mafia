import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import { getExercise } from "../../api/axios";
import {useState, useEffect} from 'react';


const ExerciseElement = ({eId}) => {

 
    const [exercise, setExercise] = useState([]);
    const [mcq, setMCQ] = useState([]);
    const [title, setTitle] = useState("Loading...");

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
    
    // //   console.log(type)

    // if(type != null) {
    //     if(type === "Technical" )
    //         typeIcon = <span class="bi bi-tools" ></span>;
    //     else if(type === "Financial")
    //         typeIcon = <span className="bi bi-cash-coin" ></span>;
    //     else
    //         typeIcon = <span className="bi bi-question-lg" ></span>

    // }
    
    // if(status != null){
    //     if(status === "Unseen")
    //         statusColor = "secondary"
    //     else if(status === "Pending")
    //         statusColor = "warning"
    //     else 
    //         statusColor = "success"
    // }
    



  return (
   
            <ListGroupItem
              key={eId}
              action
              onClick={() => navigate(`/viewExercise?id=${eId}`)}
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <span class="bi bi-pencil-square"></span> &nbsp;&nbsp;{title}
           
            </ListGroupItem>
            
  )
};

export default ExerciseElement;