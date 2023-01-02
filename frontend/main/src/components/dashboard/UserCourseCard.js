import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
    Col,Row
  } from "reactstrap";
  import { useNavigate } from "react-router-dom";

  import { CircularProgressbar } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';


  import {getCourseRating, viewCourse } from "../../api/axios";
  import {useState, useEffect} from "react";
  import * as React from 'react';
  import axios from "axios";
  import Modal from "react-bootstrap/Modal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; 
import Typography from '@mui/material/Typography'; 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


  const UserCourseCard = ({uId, cId, progress}) => {
    
    const[coursePreview,setCoursePreview] = useState([]);
    const[courseName, setCourseName] = useState("Loading...");
    const[ratings,setRatings] = useState(0);
    const[courseRating, setCourseRating] = useState(0);
    const[coursePrice, setCoursePrice] = useState(0);
    const[courseSummary, setCourseSummary] = useState("Loading...");
    const[courseSubject, setCourseSubject] = useState("Loading...");
    const[courseInstructor, setCourseInstructor] = useState("Loading...");

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    
const[cpform, setCPForm] = useState({});
const[cpErrors, setCPErrors] = useState({});

    useEffect(() => {
        viewCourse(cId).then(json => {
          setCoursePreview(json.Preview)
          setCourseName(json.NameOfCourse);
          setCourseRating(json.avgRating);
          setRatings(json.Rating.length);
          setCoursePrice(json.Cost);
          setCourseSummary(json.Summary);
          setCourseSubject(json.Subject);
          setCourseInstructor(json.Instructor[1]);
        })
      }, []);


    const navigate = useNavigate();
   
    let stars = [];
   
    for (var i = 0; i < parseInt(courseRating); i++) {
        stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
        if (((courseRating)-parseInt(courseRating)) > 0){
          stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
        }
    }

    const [show, setShow] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleCancel = () => setShow(false);


    const handleProgressClick = () => {
      if (progress < 100) {
        setOpen(true);
        console.log("progress is less than 100")
      }
      else {
        setShow(true);
        setOpen2(true);
  
      //recieve certificate by mail
      axios.get(`http://localhost:5000/User/sendCertificate?id=${uId}`);
  
        console.log("progress is 100")
      }
    };

    const handleCertificateClick = () => {
      //navigate to certificate page
      navigate(`/CertificatePage?courseId=${cId}&userId=${uId}`);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    };






    return (  
      <Card>
      
       
      <div style={{ display: "flex", justifyContent: 'flex-end'}}>
      <iframe style={{width:"42%"}} src={coursePreview} title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe>

      <CardBody className="p-4">
      <Row>
      <Col lg="8">
        <CardTitle tag="h5">{courseName}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">{courseSummary}</CardSubtitle>
        <CardText className="fw-light"><span class="bi bi-person"></span>&nbsp;{courseInstructor}</CardText>
        <CardText className="mt-3 text-muted">{stars}&nbsp;({ratings}) </CardText>
        <CardText ><span class="bi bi-book"></span> {courseSubject}</CardText>
        <Button color="primary" onClick={() => navigate(`/openCourse?id=${cId}&userId=${uId}`)}>Open Course</Button> 
        &nbsp; &nbsp; &nbsp;
        <Button color="primary" onClick={()=> { handleProgressClick()}}>Get Certificate</Button>
        </Col>
        <Col lg="4">
        <CircularProgressbar value={progress * 100} text={`${parseInt(progress * 100)}%`} />
        </Col>
        </Row>
      </CardBody>
      </div>

      <Modal
        show={show}
        onHide={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 11,mb:3}}>
            You have completed {progress}% of the course.
          </Typography>

          <Button variant="contained" size="small"
            style={{
              display: 'flex', height: 40, marginTop: 10,
              borderBlockColor: '#1aac83', borderTop: '#1aac83',
              borderBottom: '#1aac83', borderRight: '#1aac83',
              borderLeft: '#1aac83', marginLeft: 150,marginBottom:10
            }}

            onClick={() => {
              handleCertificateClick()
            }} >
            Get your certificate
          </Button>

        </Modal.Body>


      </Modal>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                  Your progress is less than 100%.
                              </Alert>
                          </Snackbar>

                          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                              <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                                  A mail with the certificate has been sent to your email.
                              </Alert>
                          </Snackbar>

      
     
    </Card>



    
    );
  };
  
  export default UserCourseCard;
  