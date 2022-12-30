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

import { getRequestedCourse } from "../../api/axios";
import {useState, useEffect} from 'react';


const RequestNotification = ({request, rId, status}) => {
    const [courseName, setCourseName] = useState('');
    
    var statusColor;

    const navigate = useNavigate();

    useEffect(() => {
        if(rId != null)
        getRequestedCourse(rId).then(json => {
        setCourseName(json)
        // console.log(json);

        })
      }, []);
    
    //   console.log(type)


    
    if(status != null){
        if(status === "Unseen")
            statusColor = "secondary"
        else if(status === "Pending")
            statusColor = "warning"
        else 
            statusColor = "success"
    }
    



  return (
            <ListGroupItem
              key={request._id}
              action
              onClick={() => navigate(`/viewRequest?id=${request._id}`)}
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={statusColor}>
              </Button> {courseName}
              {/* <small className="ms-auto text-muted text-small">
                {request.createdAt}
              </small> */}
            </ListGroupItem>
  )
};

export default RequestNotification;