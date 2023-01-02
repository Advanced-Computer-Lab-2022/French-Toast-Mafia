import { Col, Row , Alert, CardDeck, Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button, CardGroup} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { getUser } from "../api/axios";
import {useState, useEffect } from 'react';
import {Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Reviews from "../components/dashboard/CourseReviews";
import user3 from "../assets/images/users/user3.jpg";
import UserCourseCard from "../components/dashboard/UserCourseCard";

import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();


    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    const [show, setShow] = useState(false);

 
    const[userName, setUserName] = useState("Loading...")
    const[userEmail, setUserEmail] = useState("Loading...")
    const[userType, setUserType] = useState("Loading...")
    const[courseProgress, setCourseProgress] = useState([])
    const[exams, setExams] = useState([])
    // const[instructorBio, setInstructorBio] = useState("Loading...")
    // const[profileViews, setProfileViews] = useState(0);
    // const[edit,setEdit] = useState(false);
    const[wallet,setWallet] = useState(0);
  
    const[courses, setCourses] = useState([]);

   
    useEffect(() => {
        getUser(id).then(json => {
          setUserName(json.Name);
          setUserEmail(json.Email);
          setUserType(json.Type);
          setCourseProgress(json.Progress);
          setExams(json.Exams);
          // setInstructorDep(json.Department);
          // setInstructorLoc(json.InstrCountry);
          // setInstructorBio(json.Biography);
          // setProfileViews(json.ProfileViews);
          setCourses(json.Courses);
          // setWallet(json.Wallet);
          // setPercentageTaken(json.PercentOrMoneyTaken)
        })
      }, []);



 


  return (
    <div>
    

      {/***Sales & Feed***/}
      <CardDeck>
        <Card style={{height: "350px"}}>
          <CardBody>
      <Row>  
      <Col sm="6" lg="6" xl="3" xxl="3">
      <Card style={{height: "300px"}}>
     
     <CardBody className="text-center">
     <img 
         src={user3}
         className="rounded-circle"
         alt="avatar"
         width="150"
         height="150"
       />
       <hr/>
       <CardTitle tag="h5"> <span class="bi bi-person"></span> {userName} </CardTitle>    
       <CardSubtitle>{userType}</CardSubtitle>
       {/* <CardText className="mt-3 text-muted"><span class="bi bi-eye-fill"></span> {profileViews} views</CardText>  */}
  
     </CardBody>
  
   </Card>
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <Card style={{height:"300px"}}>
            <CardBody>
              <Row>
                <Col lg="10">
                <CardTitle tag="h4"><span class="bi bi-info-circle"></span> &nbsp;  Profile Information:</CardTitle>
                </Col>
                <Col lg="1">
                  {/* {edit? submitButton : editButton} */}
                </Col>   
              </Row>
           
            <hr/>
            <CardTitle tag="h5" className="mt-3 text-muted"> <span class="bi bi-person"></span> &nbsp; {userName} </CardTitle>   
            <CardTitle tag="h5" className="mt-3 text-muted"> <span class="bi bi-envelope"></span> &nbsp; {userEmail} </CardTitle>   
    
            </CardBody>
          </Card>
        </Col> 

        <Col sm="3" lg="3" xl="3" xxl="3">
          <Card style={{height:"300px"}}>
            <CardBody>
              <Row>
                <Col lg="10">
                <CardTitle tag="h4"><span class="bi bi-wallet"></span> &nbsp;Wallet:</CardTitle>
                </Col>
               
              </Row>
           
            <hr/>
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
          </Row>
          <hr/>

            <Row style={{ maxHeight : "450px",overflow: "auto"}}>
              {courseProgress.map(c => <UserCourseCard uId={id} cId={c.courseId} progress = {c.Progress}/>)}
            </Row>
        </CardBody>
        </Card>

        <Row>
          {/* <Reviews reviews={Rating} />     */}
      </Row>


      </div>
  );
};

export default UserDashboard;
