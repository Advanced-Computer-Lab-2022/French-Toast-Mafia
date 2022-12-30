import { Col, Row , Alert, CardDeck} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect } from 'react';

import EditCourseInfo from "../components/dashboard/editCourseInfo";
import EditCourseSubtitles from "../components/dashboard/editCourseSubtitles";
import EditCoursePreview from "../components/dashboard/editCoursePreview";


const EditCourse = () => {
    
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
      
    

  return (
    <div>
     
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
