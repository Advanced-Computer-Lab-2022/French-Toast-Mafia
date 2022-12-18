import { Card, CardBody, CardSubtitle, CardText, CardImg, CardTitle } from "reactstrap";
import {useState, useEffect} from 'react';

// import Chart from "react-apexcharts";

const CourseInfo = ({course,instructor}) => {
       
  return (
    <Card>
      <CardBody>
      {/* <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src={course.Preview} allowfullscreen></iframe>
        </div> */}
        {/* <CardImg style={{width:"42%", height:"42%"}} alt="Card image cap" src={course.Preview} /> */}
        <CardTitle tag="h4">{course.NameOfCourse}</CardTitle>
        <CardSubtitle className="text-muted" tag="h6"> {course.Summary} </CardSubtitle>
        <br/>
        <CardText>Difficulty: {course.LevelOfCourse}</CardText>
        <CardText>Rating: {5} </CardText>
        <CardText>Subject: {course.Subject}</CardText>
        <CardText>Created by: {instructor} </CardText>
        <CardText>Last updated on: {course.updatedAt}</CardText>
       
        
      </CardBody>
    </Card>
  );
};

export default CourseInfo;
