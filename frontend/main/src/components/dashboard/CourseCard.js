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
    const[coursePub,setCoursePub] = useState(true);

    useEffect(() => {
        viewCourse(cId).then(json => {
          setCoursePreview(json.Preview)
          setCourseName(json.NameOfCourse);
          setCourseRating(json.avgRating);
          setRatings(json.Rating.length);
          setCoursePrice(json.Cost);
          setCourseSummary(json.Summary);
          setCourseSubject(json.Subject);
          setCoursePub(json.Published);
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
    <Col lg = "4">
      <Card style={{height:"475px"}}  className="text-center" body color={!coursePub? "light-danger" : null}>
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        {/* <iframe style={{width:"42%"}} src={coursePreview} title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe> */}

        <CardBody className="p-4" >
        <CardMedia class="ratio ratio-16x9">
        <iframe src={coursePreview}  title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe> </CardMedia>
          <hr/>
            <CardTitle tag="h5">{courseName}</CardTitle>
            {coursePub? <CardText className="mt-3 text-muted">{stars} &nbsp; ({ratings}) </CardText> : null}
            <CardText ><span class="bi bi-book"></span> {courseSubject}</CardText>
            <CardTitle tag="h5">Price: {coursePrice} EGP</CardTitle>
            {!coursePub?  <Button color="primary" onClick={() => navigate(`/editCourse?id=${cId}`)}>Edit Course</Button> : <Button color="primary" onClick={() => navigate(`/viewCourse?id=${cId}`)}>View Course</Button>  }
                   
            {!coursePub? <CardText className="text-danger" ><span class="bi bi-exclamation-circle"></span> This course is not published</CardText> : null}
        </CardBody>
        </div>
      </Card>
    </Col>
    );
  };
  
  export default CourseCard;
  