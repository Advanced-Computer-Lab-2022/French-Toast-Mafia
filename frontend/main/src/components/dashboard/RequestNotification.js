import React from "react";
import axios from "axios";
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


    const handlesubmit  =  async () => {
       axios.get(`http://localhost:5000/Request/AcceptRequest?id=${request._id}`).then(
     (res) => { 
          console.log(res);
         
     }
   ) };

   const handle  =  async () => {
    axios.get(`http://localhost:5000/Request/RejectRequest?id=${request._id}`).then(
  (res) => { 
       console.log(res);
      
  }
) };
    
  



  return (
            <ListGroupItem
              key={req._id}
              action
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Col lg = "6">
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={statusColor}
                disabled>
                {icon}
              </Button> 
              {requester} &nbsp;
              ({courseName})
              </Col>
              <Button onClick={handlesubmit}
                color="primary" size="sm">
                  Accept
              </Button> 
              &nbsp;
              <Button   onclick={handle}
                color="danger" size="sm">
                  Reject
              </Button> 
              &nbsp;
              <small className="ms-auto text-muted text-small">
                {request.createdAt}
              </small>
            </ListGroupItem>
  )
};

export default RequestNotification;