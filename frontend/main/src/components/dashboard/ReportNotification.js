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

import { getReportedCourse } from "../../api/axios";
import {useState, useEffect} from 'react';


const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },

];

const ReportNotification = ({report, rId, type, status}) => {
    const [courseName, setCourseName] = useState("Loading...");
    // const [status,setStatus] = useState("Unseen");
    // const [type, setType] = useState("");
    var typeIcon;
    var statusColor;

    useEffect(() => {
        if(rId != null)
            getReportedCourse(rId).then(json => {
            setCourseName(json)
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
              key={report.id}
              action
            //   href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={statusColor}
              >
               {typeIcon}
              </Button>
              {courseName}
              <small className="ms-auto text-muted text-small">
                {/* {feed.date} */}
              </small>
            </ListGroupItem>
  )
};

export default ReportNotification;