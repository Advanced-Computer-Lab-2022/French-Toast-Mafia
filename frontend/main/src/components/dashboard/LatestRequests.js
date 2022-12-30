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

        <CardBody  style={{ maxHeight: "350px",overflowY: "auto"}}>
        <ListGroup flush className="mt-4">
          {requests.map((rep) => <RequestNotification request = {rep} rId = {rep.requested_course}  status = {rep.status}/>)} 
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default LatestRequests;