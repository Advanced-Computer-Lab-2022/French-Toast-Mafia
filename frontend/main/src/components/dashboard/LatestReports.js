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

import ReportNotification from "./ReportNotification";


const LatestReports = ({reports}) => {
  return (
    <Card>
        <CardTitle tag="h5" className="border-bottom p-3 mb-0"> <span class="bi bi-flag"></span>&nbsp;&nbsp;Latest Reports</CardTitle>

        <CardBody  style={{ maxHeight: "350px",overflowY: "auto"}}>
        <ListGroup flush className="mt-4">
          {reports.map((rep) => <ReportNotification report = {rep} rId = {rep.reported_course} type = {rep.type} status = {rep.status}/>)} 
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default LatestReports;