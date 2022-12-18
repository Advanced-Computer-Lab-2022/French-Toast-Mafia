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



  const Course = (course) => {
    const navigate = useNavigate();

    const c = Object.values(course)[0]

    const handleClick = () =>{
      navigate(`/CreditCardss`)
    }
    
    return (
      <Card >
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <iframe style={{width:"42%"}} src={c.Preview} title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe>

        <CardBody className="p-4">
          <CardTitle tag="h5">{c.NameOfCourse}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">{c.Summary}</CardSubtitle>
          <CardText className="fw-light">{c.Instructor[1]}</CardText>
          <CardText className="mt-3">Rating: {0}<br/> Subject: {c.Subject}<br/> Price: {c.Cost}</CardText>
          <Button color="primary" onClick={handleClick}  
          >View Course
          </Button>
        </CardBody>
        </div>
      </Card>
    );
  };
  
  export default Course;
  