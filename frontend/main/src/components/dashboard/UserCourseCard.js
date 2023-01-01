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
        </Col>
        <Col lg="4">
        <CircularProgressbar value={progress * 100} text={`${parseInt(progress * 100)}%`} />
        </Col>
        </Row>
      </CardBody>
      </div>
      
     
    </Card>
    
    );
  };
  
  export default UserCourseCard;
  