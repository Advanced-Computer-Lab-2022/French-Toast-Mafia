import { Col, Row , Alert, CardDeck, Card, CardTitle, CardBody, Button, Input} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect } from 'react';

import OpenCourseInfo from "../components/dashboard/OpenCourseInfo";
import Reviews from "../components/dashboard/CourseReviews";
import OpenCourseSubtitles from "../components/dashboard/OpenCourseSubtitles";
import user2 from "../assets/images/users/user2.jpg";
import Modal from "react-bootstrap/Modal";
import { Form, FormControl , FormLabel,  } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';


const OpenCourse = () => {

    const search = useLocation().search;
    const cId = new URLSearchParams(search).get('id');
    const uId = new URLSearchParams(search).get('userId');

    const[course, setCourse] = useState([])
    const[instructorId, setInstructorId] = useState([])
    const[instructorName, setInstructorName] = useState([])
    const[Rating, setRating] = useState([])
    const[subtitles, setSubtitles] = useState([])
    const[preview, setPreview] = useState([])
    const [price, setPrice] = useState([])
    const [ratingLength, setRatingLength] = useState([])
    const [reportAlert, setReportAlert] = useState(false)
    const [reviewAlert, setReviewAlert] = useState(false)
    const [showRev, setShowRev] = useState(false);
    const [RevRating, setRevRating] = useState("1");


    const [review, setReview] = useState("");

    const reviewData = {};
  
    const handleCloseRev = () => setShowRev(false);
  
    const handleShowRev = () => setShowRev(true);
  

    const onDismiss = () => {
      setReportAlert(false);
    };
  
    
    const onDismissRev = () => {
      setReviewAlert(false);
    };
  

    const handleReviewSubmit = async(req , res) => {
      reviewData["id"] = uId;
      reviewData["rating"] = RevRating;
      reviewData["review"] = review;
  
    
      await fetch(`http://localhost:5000/Instructor/addInstructorRating?id=${instructorId}`,{
          method: 'POST',
          body: JSON.stringify(reviewData),
          headers : {
              'Content-Type':'application/json'
          }
      }).then(json =>{
      handleCloseRev()
      window.location.reload();
      return setReviewAlert(true)
      })
  
    }
  
  



    useEffect(() => {
        viewCourse(cId).then(json => {
        setCourse(json)
        setInstructorId(json.Instructor[0])
        setInstructorName(json.Instructor[1]);
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
      <Modal show={showRev}  onHide={handleCloseRev}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="problemReport">
             
            <Form.Label>Rating:</Form.Label>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="1"
                name="radio-buttons-group"
  >
              <FormControlLabel value="1" control={<Radio />} label="1" onChange={(e) => setRevRating("1")} />
              <FormControlLabel value="2" control={<Radio />} label="2" onChange={(e) => setRevRating("2")}/>
              <FormControlLabel value="3" control={<Radio />} label="3" onChange={(e) => setRevRating("3")}/>
              <FormControlLabel value="4" control={<Radio />} label="4" onChange={(e) => setRevRating("4")} />
              <FormControlLabel value="5" control={<Radio />} label="5" onChange={(e) => setRevRating("5")}/>
          
            </RadioGroup>
              <br/>
              <Form.Label>Review: </Form.Label>
              <Input
              type="textarea"
              id="description" rows="3" required="true" onChange={(e) => setReview(e.target.value)}/>
              <br/>
             
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleCloseRev} >
            Close
          </Button>
          <Button color="primary" onClick={handleReviewSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      


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
        <Col lg="8" >
          <OpenCourseInfo uId = {uId} cId = {cId} course={course} instructor={instructorName} ratingLength = {ratingLength} setReportAlert={setReportAlert} setReviewAlert={setReviewAlert}/>
        </Col>
        <Col lg="4">
        <Card>
          <CardBody className="text-center" style={{height: "300px"}}>
          <img 
              src={user2}
              className="rounded-circle"
              alt="avatar"
              width="150"
              height="150"
            />
            <hr/>
            <CardTitle tag="h5"> <span class="bi bi-person"></span> {instructorName} </CardTitle>    
            <Button outline color="primary" onClick={handleShowRev}>Review Instructor</Button> 
     </CardBody>
     </Card>
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
       {Rating?.length?  <Reviews reviews={Rating} />  : <Alert color="primary">No Reviews yet.</Alert>}
       </Row>

      </div>
   
  );
};

export default OpenCourse;
