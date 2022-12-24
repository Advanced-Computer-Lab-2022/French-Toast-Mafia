import { Col, Row, Alert} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect} from 'react';

import Reviews from "../components/dashboard/CourseReviews";
import CourseSubtitles from "../components/dashboard/CourseSubtitles";
import CoursePreview from "../components/dashboard/CoursePreview";
import LatestReports from "../components/dashboard/LatestReports";
import { getAllReports } from "../api/axios";

const AdminDashboard = () => {

    const search = useLocation().search;
    const aId = new URLSearchParams(search).get('id');

    const[reports, setReports] = useState([  <Alert color="info">No reports available</Alert>]);
    const[instructor, setInstructor] = useState([])
    const[Rating, setRating] = useState([])
    const[subtitles, setSubtitles] = useState([])
    const[preview, setPreview] = useState([])
    const [price, setPrice] = useState([])
    const [ratingLength, setRatingLength] = useState([])
    const [reportAlert, setReportAlert] = useState(false)

    useEffect(() => {
        getAllReports().then(json => {
        setReports(json)
        // setInstructor(json.Instructor[1])
        // setRating(json.Rating)
        // setSubtitles(json.CourseSubtitle)
        // setPreview(json.Preview)
        // setPrice(json.Cost)
        // setRatingLength(json.Rating.length)
        })
      }, []);

  return (
    <div>
      {/***Top Cards***/}
      {/* <div>
            <Alert color="success" isOpen={reportAlert} toggle={onDismiss.bind(null)}>
              Thank you for reporting the issue.
            </Alert>
          </div> */}
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="6">
            <LatestReports reports = {reports}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="6">

            {/* PLACE THE COMPONENT HERE */}

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

export default AdminDashboard;
