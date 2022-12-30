import { Col, Row , Alert, CardDeck, Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button, CardGroup} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { getInstructor } from "../api/axios";
import {useState, useEffect } from 'react';
import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";


import Reviews from "../components/dashboard/CourseReviews";
import user2 from "../assets/images/users/user2.jpg";
import LatestReports from "../components/dashboard/LatestReports";
import CourseCard from "../components/dashboard/CourseCard";

const InstructorDashboard = () => {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    console.log(id);  
    //const[courses, setCourses] = useState([])
    const[instructorName, setInstructorName] = useState("Loading...")
    const[instructorEmail, setInstructorEmail] = useState("Loading...")
    const[instructorDep, setInstructorDep] = useState("Loading...")
    const[instructorLoc, setInstructorLoc] = useState("Loading...")
    const[instructorBio, setInstructorBio] = useState("Loading...")
    const[profileViews, setProfileViews] = useState(0);
    const[edit,setEdit] = useState(false);
    const[wallet,setWallet] = useState(0);
    const[percentageTaken,setPercentageTaken] = useState(0);
    const[submit,setSubmit] = useState(false);

    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});

    const[courses, setCourses] = useState([]);



    useEffect(() => {
        getInstructor(id).then(json => {
          setInstructorName(json.InstrName);
          setInstructorEmail(json.InstrEmail);
          setInstructorDep(json.Department);
          setInstructorLoc(json.InstrCountry);
          setInstructorBio(json.Biography);
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
          <Card style={{height:"400px"}}>
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
          <Card style={{height:"400px"}}>
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
            <Button className="btn" outline color="primary" onClick={handleSubmit}>Add New</Button>
            <Button className="btn" outline color="primary" onClick={handleSubmit}>View All</Button>
            </Col>
          </Row>
          <hr/>

            <Row style={{ maxHeight : "450px",overflow: "auto"}}>
              {courses.map(c => <CourseCard cId={c}/>)}
            </Row>
        </CardBody>
        </Card>

      </div>
  );
};

export default InstructorDashboard;
