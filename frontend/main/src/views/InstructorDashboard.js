import { Col, Row , Alert, CardDeck, Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button, CardGroup} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { getInstructor, getReporter } from "../api/axios";
import {useState, useEffect } from 'react';
import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Reviews from "../components/dashboard/CourseReviews";
import user2 from "../assets/images/users/user2.jpg";
import CourseCard from "../components/dashboard/CourseCard";

import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();


    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');


    const [show, setShow] = useState(false);

  

    const[instructorName, setInstructorName] = useState("Loading...")
    const[instructorEmail, setInstructorEmail] = useState("Loading...")
    const[instructorDep, setInstructorDep] = useState("Loading...")
    const[instructorLoc, setInstructorLoc] = useState("Loading...")
    const[instructorBio, setInstructorBio] = useState("Loading...")
    const[profileViews, setProfileViews] = useState(0);
    const[edit,setEdit] = useState(false);
    const[wallet,setWallet] = useState(0);
    const[percentageTaken,setPercentageTaken] = useState(0);
    const[Rating, setRating] = useState([]);
 
    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});

    const[courses, setCourses] = useState([]);

    const handleClose = () => setShow(false);

    const [reportAlert, setReportAlert] = useState(false)

    const onDismiss = () => {
      setReportAlert(false);
    };
  

    useEffect(() => {
        getInstructor(id).then(json => {
          setInstructorName(json.InstrName);
          setInstructorEmail(json.InstrEmail);
          setInstructorDep(json.Department);
          setInstructorLoc(json.InstrCountry);
          setInstructorBio(json.Biography);
          setRating(json.InstrRating);
          setProfileViews(json.ProfileViews);
          setCourses(json.CourseGiven);
          setWallet(json.Wallet);
          setPercentageTaken(json.PercentOrMoneyTaken)
        })
      }, []);

     
      const setField = (field, value) =>{
        setForm({
            ...form,
            [field]:value,
        })
        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null,
        })
    }

    const validateForm = () =>{
      const { name, email, department, location, biography} = form
      const newErrors = {}

      if(!name || name === "")
          form.name = instructorName
      if(!email || email === "")  
         form.email = instructorEmail
      if(!department || department === "")  
        form.department = instructorDep
      if(!location || location === "")  
        form.location = instructorLoc
      if(!biography || biography === "")  
        form.biography = instructorBio
      return newErrors
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formErrors = validateForm()

    if(Object.keys(formErrors).length > 0){
        setErrors(formErrors)
    }
    else{
        await fetch(`http://localhost:5000/Instructor/editInstructorData?id=${id}`,{
            method: 'POST',
            body: JSON.stringify({"InstrName" : form.name, "InstrEmail": form.email, "InstrCountry" : form.location, "Department" : form.department, "Biography": form.biography}),
            headers : {
                'Content-Type':'application/json'
            }
        })
        window.location.reload();
    }
}

const[ccform, setCCForm] = useState({});
const[ccErrors, setCCErrors] = useState({});




  const setCCField = (field, value) =>{
    setCCForm({
        ...ccform,
        [field]:value,
    })
    if(!!ccErrors[field])
    setCCErrors({
        ...ccErrors,
        [field]:null,
    })
}

const validateCCForm = () =>{
  const { title, difficulty, subject, summary, preview, price} = ccform
  const newErrors = {}

  if(!title || title === "")
  newErrors.title = "Please enter a course title"
  if(!difficulty || difficulty == "")
    ccform.difficulty = "Medium"
  if(!subject || subject === "")  
  newErrors.subject = "Please enter a subject"
  if(!summary || summary === "")  
  newErrors.summary = "Please enter a summary"
  if(!preview || preview === "")  
  newErrors.preview = "Please enter a preview"
  if(!price || price === "")  
    ccform.price = 0;
  return newErrors
}  




const handleCCSubmit = async (e) => {

  e.preventDefault();

  const formErrors = validateCCForm()

  if(Object.keys(formErrors).length > 0){
      setCCErrors(formErrors)
  }
  else{

      await fetch(`http://localhost:5000/Instructor/addCourse?id=${id}`,{
          method: 'POST',
          body: JSON.stringify({"NameOfCourse" : ccform.title,
            "LevelOfCourse": ccform.difficulty,
            "Summary": ccform.summary,
            "Subject": ccform.subject, 
            "Cost":ccform.price,
            "Preview": ccform.preview}),
          headers : {
              'Content-Type':'application/json'
          }
      }).then(json =>{
        handleClose();
        window.location.reload();
      })
  }
}


    const editName = 
        <Form.Group controlId="name">
          <div style={{ display: "flex", justifyContent: 'flex-end'}}>
          <Col lg="1">
          <Form.Label tag="h5" className="mt-3 text-muted " style={{fontSize:"20px"}}><span class="bi bi-person"></span> &nbsp;</Form.Label>
          </Col>
          <Form.Control 
                type="text"
                defaultValue={instructorName}
                value = {form.name}
                onChange={(e) => setField('name', e.target.value)}
                isInvalid={!!errors.name}
            ></Form.Control>
        <Form.Control.Feedback type='invalid'>
            {errors.name}
        </Form.Control.Feedback>
        </div>
      </Form.Group>

      const iName =  <CardTitle tag="h5" className="mt-3 text-muted"> <span class="bi bi-person"></span> &nbsp; {instructorName} </CardTitle>   

    const editEmail = 
    <Form.Group controlId="email">
          <div style={{ display: "flex", justifyContent: 'flex-end'}}>
          <Col lg="1">
          <Form.Label tag="h5" className="mt-3 text-muted " style={{fontSize:"20px"}}><span class="bi bi-envelope"></span> &nbsp;</Form.Label>
          </Col>
          <Form.Control 
                type="email"
                defaultValue={instructorEmail}
                value = {form.email}
                onChange={(e) => setField('email', e.target.value)}
                isInvalid={!!errors.email}
            ></Form.Control>
        <Form.Control.Feedback type='invalid'>
            {errors.email}
        </Form.Control.Feedback>
        </div>
      </Form.Group>

      const iEmail = <CardSubtitle tag="h5" className="mt-3 text-muted"><span class="bi bi-envelope"></span> &nbsp;: {instructorEmail}</CardSubtitle>

    const editDep = <Form.Group controlId="department">
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <Col lg="1">
        <Form.Label tag="h5" className="mt-3 text-muted " style={{fontSize:"20px"}}><span class="bi bi-briefcase"></span> &nbsp;</Form.Label>
        </Col>
        <Form.Control 
              type="text"
              defaultValue={instructorDep}
              value = {form.department}
              onChange={(e) => setField('department', e.target.value)}
              isInvalid={!!errors.department}
          ></Form.Control>
      <Form.Control.Feedback type='invalid'>
          {errors.department}
      </Form.Control.Feedback>
      </div>
    </Form.Group>

    const iDep =  <CardSubtitle tag="h5" className="mt-3 text-muted"><span class="bi bi-briefcase"></span> &nbsp;: {instructorDep} </CardSubtitle>

    const editLoc =  <Form.Group controlId="location">
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <Col lg="1">
        <Form.Label tag="h5" className="mt-3 text-muted " style={{fontSize:"20px"}}><span class="bi bi-globe"></span> &nbsp;</Form.Label>
        </Col>
        <Form.Control 
              type="text"
              defaultValue={instructorLoc}
              value = {form.location}
              onChange={(e) => setField('location', e.target.value)}
              isInvalid={!!errors.location}
          ></Form.Control>
      <Form.Control.Feedback type='invalid'>
          {errors.location}
      </Form.Control.Feedback>
      </div>
    </Form.Group>

  const iLoc = <CardSubtitle tag="h5" className="mt-3 text-muted"><span class="bi bi-globe"></span> &nbsp;: {instructorLoc} </CardSubtitle>

    const editBio = <Form.Group controlId="biography">
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <Col lg="1">
        <Form.Label tag="h5" className="mt-3 text-muted " style={{fontSize:"20px"}}><span class="bi bi-book"></span> &nbsp;</Form.Label>
        </Col>
        <Form.Control as='textarea'
              rows={2}
              type="textarea"
              defaultValue={instructorBio}
              value = {form.biography}
              onChange={(e) => setField('biography', e.target.value)}
              isInvalid={!!errors.biography}
          ></Form.Control>
      <Form.Control.Feedback type='invalid'>
          {errors.biography}
      </Form.Control.Feedback>
      </div>
    </Form.Group>

    const iBio = <CardSubtitle tag="h5" className="mt-3 text-muted"><span class="bi bi-book"></span> &nbsp;: {instructorBio}</CardSubtitle> 

    const editButton = <Button className="btn" outline color="primary" onClick={()=> setEdit(true)}><span class="bi bi-pencil-square"></span></Button>

    const submitButton = <Button className="btn" outline color="primary" onClick={handleSubmit}>Update</Button>

  return (
    <div>
      <div>
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ex. 'Introduction to Javascript'"
                        value = {ccform.title}
                        onChange={(e) => setCCField('title', e.target.value)}
                        isInvalid={!!ccErrors.title}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {ccErrors.title}
                    </Form.Control.Feedback>
                </Form.Group>
              <br/>
            <Form.Group controlId="difficulty">
              <Form.Label>Difficulty:</Form.Label>
        
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Medium"
                  name="radio-buttons-group"
  >           <Row>
                  <Col>
                    <FormControlLabel value="Easy" control={<Radio />} label="Easy" onChange={(e) => setCCField('difficulty', e.target.value)} />
                  </Col>
                  <Col>
                    <FormControlLabel value="Medium" control={<Radio />} label="Medium" onChange={(e) => setCCField('difficulty', e.target.value)}/>
                  </Col>
                  <Col>
                    <FormControlLabel value="Hard" control={<Radio />} label="Hard" onChange={(e) => setCCField('difficulty', e.target.value)}/>
                  </Col>
                </Row>
              </RadioGroup>
            </Form.Group>
               <Form.Group controlId="subject">
                   <Form.Label>Subject:</Form.Label>
                   <Form.Control 
                       type="text"
                       placeholder="Ex. 'Computer Science'"
                       value = {ccform.subject}
                       onChange={(e) => setCCField('subject', e.target.value)}
                       isInvalid={!!ccErrors.subject}
                   ></Form.Control>
                   <Form.Control.Feedback type='invalid'>
                       {ccErrors.subject}
                   </Form.Control.Feedback>
               </Form.Group>
               <br/>
                <Form.Group controlId="summary">
                    <Form.Label>Summary:</Form.Label>
                      <Form.Control 
                      as='textarea'
                      rows={3}
                      type="textarea"
                      placeholder="Write a Summary"
                      value = {ccform.summary}
                      onChange={(e) => setCCField('summary', e.target.value)}
                      isInvalid={!!ccErrors.summary}
                      ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {ccErrors.summary}
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>
               <Form.Group controlId="preview">
                   <Form.Label>Preview:</Form.Label>
                   <Form.Control 
                       type="text"
                       placeholder="https://www.youtube.com/embed/IyGwvGzrqp8"
                       value = {ccform.preview}
                       onChange={(e) => setCCField('preview', e.target.value)}
                       isInvalid={!!ccErrors.preview}
                   ></Form.Control>
                   <Form.Control.Feedback type='invalid'>
                       {ccErrors.preview}
                   </Form.Control.Feedback>
               </Form.Group>

               <br/>

               <Form.Group controlId="price">
                   <Form.Label>Price:</Form.Label>
                   <Form.Control 
                       type="number"
                       placeholder="0"
                       min = "0"
                       max = "100000"
                       value = {ccform.price}
                       onChange={(e) => setCCField('price', e.target.value)}
                       isInvalid={!!ccErrors.price}
                   ></Form.Control>
                   <Form.Control.Feedback type='invalid'>
                       {ccErrors.price}
                   </Form.Control.Feedback>
               </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger"onClick={handleClose} >
            Close
          </Button>
          <Button color="primary" onClick={handleCCSubmit}>
            Save Course
          </Button>
        </Modal.Footer>
      </Modal>
      </div>


      {/***Sales & Feed***/}
      <CardDeck>
        <Card style={{height: "440px"}}>
          <CardBody>
      <Row>  
      <Col sm="6" lg="6" xl="3" xxl="3">
      <Card style={{height: "400px"}}>
     
     <CardBody className="text-center">
     <img 
         src={user2}
         className="rounded-circle"
         alt="avatar"
         width="150"
         height="150"
       />
       <hr/>
       <CardTitle tag="h5"> <span class="bi bi-person"></span> {instructorName} </CardTitle>    
       <CardSubtitle>{instructorDep} Instructor</CardSubtitle>
       <CardText className="mt-3 text-muted"><span class="bi bi-eye-fill"></span> {profileViews} views</CardText> 
  
     </CardBody>
  
   </Card>
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <Card style={{height:"475px"}}>
            <CardBody>
              <Row>
                <Col lg="10">
                <CardTitle tag="h4"><span class="bi bi-info-circle"></span> &nbsp;  Profile Information:</CardTitle>
                </Col>
                <Col lg="1">
                  {edit? submitButton : editButton}
                </Col>   
              </Row>
           
            <hr/>
            {edit? editName : iName}
            {edit? editEmail : iEmail}
            {edit? editDep : iDep}
            {edit? editLoc : iLoc}
            {edit? editBio : iBio}
            </CardBody>
          </Card>
        </Col> 

        <Col sm="3" lg="3" xl="3" xxl="3">
          <Card style={{height:"475px"}}>
            <CardBody>
              <Row>
                <Col lg="10">
                <CardTitle tag="h4"><span class="bi bi-wallet"></span> &nbsp;Wallet:</CardTitle>
                </Col>
               
              </Row>
           
            <hr/>
            <CardSubtitle tag="h5" className="mt-3 text-muted"><span class="bi bi-percent"></span> taken&nbsp;: {percentageTaken}</CardSubtitle> 
            <CardSubtitle tag="h5" className="mt-3 text-muted"><span class="bi bi-cash"></span> Balance&nbsp;: {wallet} EGP</CardSubtitle> 
            </CardBody>
          </Card>
        </Col> 

      </Row>
      </CardBody>
      </Card>
      </CardDeck>
      {/***Table ***/}

        <Card>
        <CardBody>
          <Row>
            <Col lg="10">
              <CardTitle tag="h4">My Courses</CardTitle>
            </Col>
            <Col lg="2">
            <Button className="btn" outline color="primary" onClick={() => setShow(true)}>Add New</Button>
            <Button className="btn" outline color="primary" onClick={() => navigate(`/searchInstructorCourses?id=${id}`)}>View All</Button>
            </Col>
          </Row>
          <hr/>

            <Row style={{ maxHeight : "475px",overflow: "auto"}}>
              {courses.map(c => <CourseCard cId={c}/>)}
            </Row>
        </CardBody>
        </Card>

        <Row>
          {Rating?.length?   <Reviews reviews={Rating} />  : <Alert color="primary">No Reviews yet.</Alert>}
          
      </Row>


      </div>
  );
};

export default InstructorDashboard;
