import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
  } from "reactstrap";
  

  import bg1 from "../../assets/images/bg/bg1.jpg";

  const Course = (course) => {
  
    const c = Object.values(course)[0]

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
          <CardText className="fw-light">{c.Instructor[1]}</CardText>
          <CardText className="mt-3">Rating: {0}<br/> Subject: {c.Subject}<br/> Price: {c.Cost}</CardText>
          <Button color="primary" onClick={handleClick} >View Course</Button>
        </CardBody>
        </div>
      </Card>
    );
  };
  
  export default Course;
  