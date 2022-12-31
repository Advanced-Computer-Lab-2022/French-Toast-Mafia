import { Col, Row , Alert, CardDeck,Card, CardBody, Button, CardTitle} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect } from 'react';

import EditCourseInfo from "../components/dashboard/editCourseInfo";
import EditCourseSubtitles from "../components/dashboard/editCourseSubtitles";
import EditCoursePreview from "../components/dashboard/editCoursePreview";
import { useNavigate } from "react-router-dom";

import { deleteCourse, publishCourse } from "../api/axios";

const EditCourse = () => {
    
  const navigate = useNavigate();

    const search = useLocation().search;
    const cId = new URLSearchParams(search).get('id');
    const[course, setCourse] = useState([])
    const[subtitles, setSubtitles] = useState([])
    const[preview, setPreview] = useState([])
    const [price, setPrice] = useState([])
   
    useEffect(() => {
        viewCourse(cId).then(json => {
        setCourse(json)
        setSubtitles(json.CourseSubtitle)
        setPreview(json.Preview)
        setPrice(json.Cost)
        })
      }, []);

      useEffect(() => {
   
      }, []);
      
    const handleDelete = (e) =>{
      deleteCourse(cId).then(json =>{
        navigate("/Home");
      })
    }

    const handlePublish = (e) =>{
      publishCourse(cId).then(json =>{
        navigate("/Home");
      })
    }


  return (
    <div> 
      <Card>
        <CardBody>
        <Row>
        <Col lg="8">
          <CardTitle tag="h4">Edit Course</CardTitle>
        </Col>
        <Col lg="2">
        <Button color="danger" onClick = {handleDelete}>Delete Course</Button>
        </Col>
        <Col lg="2">
        <Button color="primary" onClick = {handlePublish} >Publish Course</Button>
        </Col>
        </Row>
        </CardBody>
      </Card>
      {/***Sales & Feed***/}
      <CardDeck>
      <Row>  
        <Col sm="6" lg="6" xl="7" xxl="7">
          <EditCourseInfo cId = {cId} course={course}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="5">
          <EditCoursePreview preview = {preview}/>
        </Col>
      </Row>
      </CardDeck>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <EditCourseSubtitles cId = {cId} subtitles={subtitles} />
        </Col>
      </Row>
      {/***Blog Cards***/}


    </div>
  );
};

export default EditCourse;
