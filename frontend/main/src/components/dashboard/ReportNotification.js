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

import { getReportedCourse } from "../../api/axios";
import {useState, useEffect} from 'react';


const ReportNotification = ({report, rId, type, status}) => {
    const [courseName, setCourseName] = useState("Loading...");
    
    var typeIcon;
    var statusColor;

    const navigate = useNavigate();

    useEffect(() => {
        if(rId != null)
            getReportedCourse(rId).then(json => {
            setCourseName(json)
            // console.log(json)

        })
      }, []);
    
    //   console.log(type)

    if(type != null) {
        if(type === "Technical" )
            typeIcon = <span class="bi bi-tools" ></span>;
        else if(type === "Financial")
            typeIcon = <span className="bi bi-cash-coin" ></span>;
        else
            typeIcon = <span className="bi bi-question-lg" ></span>

    }
    
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
              key={report._id}
              action
              onClick={() => navigate(`/viewReport_A?id=${report._id}`)}
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={statusColor}>
               {typeIcon}
              </Button>
              {courseName}
              <small className="ms-auto text-muted text-small">
                {report.createdAt}
              </small>
            </ListGroupItem>
            
  )
};

export default ReportNotification;