import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
  } from "reactstrap";
  import { useNavigate } from "react-router-dom";

  import {getCourseRating } from "../../api/axios";
  import {useState, useEffect} from "react";

  const Course = (course) => {

    const navigate = useNavigate();
    const [rating, setRating] = useState(0);


    const c = Object.values(course)[0]
    const cId = c._id;
  
    useEffect(() => {
      getCourseRating(cId).then(json => {
        setRating(json)
      })
    }, []);

    return (
      <Card >
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <iframe style={{width:"42%"}} src={c.Preview} title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe>

        <CardBody className="p-4">
          <CardTitle tag="h5">{c.NameOfCourse}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">{c.Summary}</CardSubtitle>
          <CardText className="fw-light">{c.Instructor[1]}</CardText>
          <CardText className="mt-3">Rating: {rating}<br/> Subject: {c.Subject}</CardText>
          <CardTitle tag="h5">Price: {c.Cost} EGP</CardTitle>
          <Button color="primary" onClick={() => navigate(`/viewCourse?id=${cId}`)}>View Course</Button>        

        </CardBody>
        </div>
       
      </Card>
    );
  };
  
  export default Course;
  