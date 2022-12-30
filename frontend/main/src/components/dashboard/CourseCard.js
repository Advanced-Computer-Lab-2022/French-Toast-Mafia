import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
    Col,
  } from "reactstrap";
  import { useNavigate } from "react-router-dom";

  import { CardMedia } from "@mui/material";

  import {getCourseRating, viewCourse } from "../../api/axios";
  import {useState, useEffect} from "react";

  const CourseCard = ({cId}) => {
    
    const[coursePreview,setCoursePreview] = useState([]);
    const[courseName, setCourseName] = useState("Loading...");
    const[ratings,setRatings] = useState(0);
    const[courseRating, setCourseRating] = useState(0);
    const[coursePrice, setCoursePrice] = useState(0);
    const[courseSummary, setCourseSummary] = useState("Loading...");
    const[courseSubject, setCourseSubject] = useState("Loading...");

    useEffect(() => {
        viewCourse(cId).then(json => {
          setCoursePreview(json.Preview)
          setCourseName(json.NameOfCourse);
          setCourseRating(json.avgRating);
          setRatings(json.Rating.length);
          setCoursePrice(json.Cost);
          setCourseSummary(json.Summary);
          setCourseSubject(json.Subject);
        })
      }, []);

    console.log(courseName)
    const navigate = useNavigate();
   
    let stars = [];
   
    for (var i = 0; i < parseInt(courseRating); i++) {
        stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
        if (((courseRating)-parseInt(courseRating)) > 0){
          stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
        }
    }

    return (
    <Col lg = "4">
      <Card style={{height:"450px"}}  className="text-center">
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        {/* <iframe style={{width:"42%"}} src={coursePreview} title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe> */}

        <CardBody className="p-4">
        <CardMedia class="ratio ratio-16x9">
        <iframe src={coursePreview}  title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe> </CardMedia>
   
            <CardTitle tag="h5">{courseName}</CardTitle>
            {/* <CardSubtitle className="mb-2 text-muted" tag="h6">{courseSummary}</CardSubtitle> */}
            <CardText className="mt-3 text-muted">{stars} &nbsp; ({ratings}) </CardText>
            <CardText ><span class="bi bi-book"></span> {courseSubject}</CardText>
            <CardTitle tag="h5">Price: {coursePrice} EGP</CardTitle>
            <Button color="primary" onClick={() => navigate(`/viewCourse?id=${cId}`)}>View Course</Button>        

        </CardBody>
        </div>
      </Card>
    </Col>
    );
  };
  
  export default CourseCard;
  