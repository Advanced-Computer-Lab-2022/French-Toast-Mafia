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

  import { CardMedia } from "@mui/material";

  import {getCourseRating, viewCourse } from "../../api/axios";
  import {useState, useEffect} from "react";
  import {Form} from "react-bootstrap"
import Modal from "react-bootstrap/Modal";

  const CourseCard = ({cId}) => {
    
    const[coursePreview,setCoursePreview] = useState([]);
    const[courseName, setCourseName] = useState("Loading...");
    const[ratings,setRatings] = useState(0);
    const[courseRating, setCourseRating] = useState(0);
    const[coursePrice, setCoursePrice] = useState(0);
    const[courseSummary, setCourseSummary] = useState("Loading...");
    const[courseSubject, setCourseSubject] = useState("Loading...");
    const[coursePub,setCoursePub] = useState(true);

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


    const pubButton = <>
    <Row>
    <Col>
    <Button color="primary" onClick={() => navigate(`/viewCourse?id=${cId}`)}>View Course</Button>
    </Col>
    <Col>
    <Button color="primary"  onClick={setShow1}>Define Promo</Button>
    </Col>
    </Row>
    </>


    const setCPField = (field, value) =>{
      setCPForm({
          ...cpform,
          [field]:value,
      })
      if(!!cpErrors[field])
      setCPErrors({
          ...cpErrors,
          [field]:null,
      })
    }
    
    const validateCPForm = () =>{
      const { promotion, start, end} = cpform
      const newErrors = {}
    
      if(!promotion ||promotion === "")
      newErrors.promotion = "Please enter a course promotion"
      if(!start|| start === "")  
      newErrors.start = "Please enter a start time"
      if(!end|| end === "")  
      newErrors.end = "Please enter an end time"
      return newErrors
    }

const handleCPSubmit = async (e) => {
  console.log("jjjjjjjjjjj")

  e.preventDefault();

  const formErrors = validateCPForm()

  if(Object.keys(formErrors).length > 0){
      setCPErrors(formErrors)
  }
  else{

      await fetch(`http://localhost:5000/Instructor/addPromotion?id=${cId}`,{
          method: 'POST',
          body: JSON.stringify({"Promotion" : cpform.promotion,
            "StartDatePromotion": cpform.start,
            "EndDatePromotion": cpform.end}),
          headers : {
              'Content-Type':'application/json'
          }
      }).then(json =>{
        handleClose1()
        window.location.reload();
      })
  }
}

    return (  
    <Col lg = "4">
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Course Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group controlId="Promotion">
                    <Form.Label>Promotion:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. '50'"
                        value = {cpform.promotion}
                        onChange={(e) => setCPField('promotion', e.target.value)}
                        isInvalid={!!cpErrors.promotion}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {cpErrors.promotion}
                    </Form.Control.Feedback>
                </Form.Group>

              <br/>
            <Form.Group controlId="start">
              <Form.Label>Promotion Start Time:</Form.Label>
              <Form.Control 
                        type="text"
                        placeholder="Ex. 'YYYY-MM-DD'"
                        value = {cpform.start}
                        onChange={(e) => setCPField('start', e.target.value)}
                        isInvalid={!!cpErrors.start}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {cpErrors.start}
                    </Form.Control.Feedback>
      
            </Form.Group>
               <Form.Group controlId="subject">
                   <Form.Label>Promotion end time :</Form.Label>
                   <Form.Control 
                       type="text"
                       placeholder="Ex. 'YYYY-MM-DD'"
                       value = {cpform.end}
                       onChange={(e) => setCPField('end', e.target.value)}
                       isInvalid={!!cpErrors.end}
                   ></Form.Control>
                   <Form.Control.Feedback type='invalid'>
                       {cpErrors.end}
                   </Form.Control.Feedback>
               </Form.Group>
               <br/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleClose1} >
            Close
          </Button>
          <Button color="primary" onClick={handleCPSubmit}>
            Save Promotion
          </Button>
        </Modal.Footer>
      </Modal>
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
            {!coursePub?  <Button color="primary" onClick={() => navigate(`/editCourse?id=${cId}`)}>Edit Course</Button> :  pubButton }
                   
            {!coursePub? <CardText className="text-danger" ><span class="bi bi-exclamation-circle"></span> This course is not published</CardText> : null}
        </CardBody>
        </div>
      </Card>
    </Col>
    
    );
  };
  
  export default CourseCard;
  