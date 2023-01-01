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
    const cId = c._id;
    
    let stars = [];
   
    for (var i = 0; i < parseInt(c.avgRating); i++) {
        stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
        if (((c.avgRating)-parseInt(c.avgRating)) >0){
          stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
        }
    }

    return (
      <Card >
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <iframe style={{width:"42%"}} src={c.Preview} title="YouTube video" allowFullScreen autoplay={"false"}  ></iframe>

        <CardBody className="p-4">
          <CardTitle tag="h5">{c.NameOfCourse}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">{c.Summary}</CardSubtitle>
          <CardText className="fw-light"><span class="bi bi-person"></span>&nbsp;{c.Instructor[1]}</CardText>
          <CardText className="mt-3 text-muted">{stars}&nbsp;({c.Rating.length}) </CardText>
          <CardText ><span class="bi bi-book"></span> {c.Subject}</CardText>
          {/* <CardTitle tag="h5">Price: {c.Cost} EGP</CardTitle> */}
          <Button color="primary" onClick={() => navigate(`/viewCourseCop?id=${cId}`)}>View </Button>        

        </CardBody>
        </div>
       
      </Card>
    );
  };
  
  export default Course;
  