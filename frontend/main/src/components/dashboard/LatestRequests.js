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

import RequestNotification from "./RequestNotification";


const LatestRequests = ({requests}) => {
  return (
    <Card>
        <CardTitle tag="h5" className="border-bottom p-3 mb-0"> <span class="bi bi-flag"></span>&nbsp;&nbsp;Latest Requests</CardTitle>
        <CardBody  style={{ height : "350px", maxHeight: "350px",overflowY: "auto"}}>
        <ListGroup flush className="mt-4">
          {requests.map((req) => <RequestNotification request = {req} reqCourse = {req.requested_course} reqUser = {req.requested_by} status = {req.status}/>)} 
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default LatestRequests;