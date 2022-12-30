import React from "react";
import {
  Col,
  Row,
  ListGroupItem,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import { getRequester, getRequestedCourse} from "../../api/axios";
import {useState, useEffect} from 'react';


const RequestNotification = ({request, reqCourse, reqUser, status}) => {
    const [req, setReq] = useState([]);
    const [courseName, setCourseName] = useState('Loading...');
    const [ requester, setRequester] = useState("Loading...");
   
    var statusColor;
    const icon = <span class="bi bi-person"></span>
    // const navigate = useNavigate();
    
    useEffect(() => {
        setReq(request)

        if(request._id != null){
          getRequestedCourse(reqCourse).then(json => {
            setCourseName(json)     
          })
          getRequester(reqUser).then(json => {
            setRequester(json)     
          })
        }
      }, []);
    
    //   console.log(type)
    
    if(status != null){
        if(status === "Unseen")
            statusColor = "secondary"
        else if(status === "Rejected")
            statusColor = "danger"
        else 
            statusColor = "success"
    }
    



  return (
            <ListGroupItem
              key={req._id}
              action
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={statusColor}
                disabled>
                {icon}
                
              </Button> 
              {requester} &nbsp;
              ({courseName})
              <Button
                color="primary">
                  Accept
              </Button> 
              &nbsp;
              <Button
                color="danger">
                  Reject
              </Button> 
              <small className="ms-auto text-muted text-small">
                {req.createdAt}
              </small>
            </ListGroupItem>
  )
};

export default RequestNotification;