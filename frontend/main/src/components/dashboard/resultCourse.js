import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
  } from "reactstrap";
  
  import { getCourseInstructor } from "../../api/axios";
  import {useState} from 'react';

  import bg1 from "../../assets/images/bg/bg1.jpg";

  const Course = (course) => {
    const[instructorName,setInstructorName] = useState([])

    const c = Object.values(course)[0]

    getCourseInstructor(c._id).then(json =>{
      setInstructorName(Object.values(json[0])[1])
    })
  
    const handleClick = () =>{
      console.log("clicked")
    }
    
    return (
      <Card>
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <CardImg style={{width:"42%", height:"42%"}} alt="Card image cap" src={bg1} />
        <CardBody className="p-4">
          <CardTitle tag="h5">{c.NameOfCourse}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">{c.Summary}</CardSubtitle>
          <CardText className="fw-light">{instructorName}</CardText>
          <CardText className="mt-3">Rating: {0}<br/> Subject: {c.Subject}<br/> Price: {c.Cost}</CardText>
          <Button color="primary" onClick={handleClick}>View Course</Button>
        </CardBody>
        </div>
      </Card>
    );
  };
  
  export default Course;
  