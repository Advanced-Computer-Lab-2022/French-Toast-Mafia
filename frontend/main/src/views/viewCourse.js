import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect} from 'react';

import CourseInfo from "../components/dashboard/CourseInfo";
import Reviews from "../components/dashboard/CourseReviews";
import CourseSubtitles from "../components/dashboard/CourseSubtitles";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";


const ViewCourse = () => {

    const search = useLocation().search;
    const cId = new URLSearchParams(search).get('id');

    const[course, setCourse] = useState([])
    const[instructor, setInstructor] = useState([])
    const[Rating, setRating] = useState([])
    const[subtitles, setSubtitles] = useState([])

    useEffect(() => {
        viewCourse(cId).then(json => {
        setCourse(json)
        setInstructor(json.Instructor[1])
        setRating(json.Rating)
        setSubtitles(json.CourseSubtitle)
        })
      }, []);

  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <CourseInfo course={course} instructor={instructor}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <CourseSubtitles subtitles={subtitles} />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
      <Reviews reviews={Rating} />
    
      </Row>
    </div>
  );
};

export default ViewCourse;
