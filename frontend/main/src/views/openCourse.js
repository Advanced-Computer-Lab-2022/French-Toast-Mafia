import { Col, Row , Alert, CardDeck, Card, CardBody} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect } from 'react';

import OpenCourseInfo from "../components/dashboard/OpenCourseInfo";
import Reviews from "../components/dashboard/CourseReviews";
import OpenCourseSubtitles from "../components/dashboard/OpenCourseSubtitles";
import CoursePreview from "../components/dashboard/CoursePreview";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";


const OpenCourse = () => {

    const search = useLocation().search;
    const cId = new URLSearchParams(search).get('id');

    const[course, setCourse] = useState([])
    const[instructor, setInstructor] = useState([])
    const[Rating, setRating] = useState([])
    const[subtitles, setSubtitles] = useState([])
    const[preview, setPreview] = useState([])
    const [price, setPrice] = useState([])
    const [ratingLength, setRatingLength] = useState([])
    const [reportAlert, setReportAlert] = useState(false)
    const [reviewAlert, setReviewAlert] = useState(false)

    const onDismiss = () => {
      setReportAlert(false);
    };
  
    
    const onDismissRev = () => {
      setReviewAlert(false);
    };
  


    useEffect(() => {
        viewCourse(cId).then(json => {
        setCourse(json)
        setInstructor(json.Instructor[1])
        setRating(json.Rating)
        setSubtitles(json.CourseSubtitle)
        setPreview(json.Preview)
        setPrice(json.Cost)
        setRatingLength(json.Rating.length)
        })
      }, []);

      useEffect(() => {
   
      }, [reportAlert]);
      
      useEffect(() => {
   
      }, [reviewAlert]);

  return (
   
    <div>
      <div>
            <Alert color="success" isOpen={reportAlert} toggle={onDismiss.bind(null)}>
              Thank you for reporting the issue.
            </Alert>
            <Alert color="success" isOpen={reviewAlert} toggle={onDismissRev.bind(null)}>
              Thank you for leaving a review.
            </Alert>
          </div>
      {/***Sales & Feed***/}
      <CardDeck>
      <Row>  
        <Col sm="6" lg="6" xl="7" xxl="7">
          <OpenCourseInfo cId = {cId} course={course} instructor={instructor} ratingLength = {ratingLength} setReportAlert={setReportAlert} setReviewAlert={setReviewAlert}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="5">
          <CoursePreview preview = {preview} price = {price} />
        </Col>
      </Row>
      </CardDeck>
     
      <Row>
        <Col lg="12">
          <OpenCourseSubtitles subtitles={subtitles} />
        </Col>
      </Row>
       {/***Blog Cards***/}
       <Row>
        <Reviews reviews={Rating} />
       </Row>

      </div>
   
  );
};

export default OpenCourse;
