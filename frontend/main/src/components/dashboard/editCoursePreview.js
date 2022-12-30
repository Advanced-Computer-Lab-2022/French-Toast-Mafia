import { CardMedia } from "@mui/material";
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



const EditCoursePreview = ({preview}) => {
  return (
    <Card>
      <CardBody className="text-center" style={{height: "350px"}}>
       <CardMedia class="ratio ratio-16x9">
    <iframe src={preview}  title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe> </CardMedia>
   

      </CardBody>
    </Card>
  );
};

export default EditCoursePreview;
