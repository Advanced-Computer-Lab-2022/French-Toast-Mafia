import axios from 'axios';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button, Row, Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Input,
    Alert
    } from "reactstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from "react-bootstrap/Modal";
import { Form, FormControl , FormLabel,  } from "react-bootstrap";
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import user1 from "../assets/images/users/user1.jpg";

const InstructorInfo =()=> {

    const navigate = useNavigate();

    const search = useLocation().search;
    const InstrId = new URLSearchParams(search).get('instrId');
    const [Info, setInfo] = useState([]);
    const [rate, setRate] = useState([]);
    const [okay, setOkay] = useState(false);
    const [InstrEmail, setEmail] = useState('');
    const [Biography, setBiography] = useState('');
    const[err , setErr] = useState(null)
    const [open, setOpen] = React.useState(false);


    const[done , setDone] = useState(false);
    const[don , setDone1] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setOkay(false);
    
    const handleShow = () => setShow(true);
    const handleOkay = () => setOkay(true);

    let stars = [];
    for (var i = 0; i < parseInt(rate); i++) {
        stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
         if (((rate)-parseInt(rate)) >0){
       stars.push( <i className="bi bi-star-half"style={{ color: "rgb(255, 210, 48)"}}></i>);
     }
 }

 const handleC = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(true);
        const Test = {InstrEmail}
        const response = await fetch(`http://localhost:5000/Instructor/editInstrEmail?id=${InstrId}` , {
            method : 'POST' ,
            body : JSON.stringify(Test) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 
        const json = await response.json(Test)
        if(!response.ok){
            setErr(json.err)
    
        }
        if(response.ok){
            setEmail('')
            setDone1(true);
            setErr(null)
            handleClose(true);
            console.log('Email has been edited', json)
        }
    }
    const handle = async (e) => {
        e.preventDefault();
        const Test = {Biography}
        const response = await fetch(`http://localhost:5000/Instructor/editInstrBiography?id=${InstrId}` , {
            method : 'POST' ,
            body : JSON.stringify(Test) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 
        const json = await response.json(Test)
        if(!response.ok){
            setErr(json.err)
    
        }
        if(response.ok){
            setBiography('')
            setDone1(true);
            setErr(null)
            
            console.log('Biography has been edited', json)
        }
    }


    useEffect(function () {
      axios.get(`http://localhost:5000/Instructor/viewInstrInfo?instrId=${InstrId}`).then(
        (res) => {
          const resInfo = res.data
          setInfo(resInfo)
        }
      );
    }, []);
  
    useEffect (()=>
    { axios.get(`http://localhost:5000/Instructor/calculateInstrRating?id=${InstrId}`).then(
        (res) => {
          const resRate = res.data
          setRate(resRate)
   
        }
      );
  
    },[]);

    const navigateToBalance= () => {
        // 
        navigate(`/InstructorBalance?instrId=${InstrId}`);
      };


  return (
    <div>
          <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Email </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >   
            <Form.Group >
              <Form.Label> New Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={InstrEmail}
                onChange={(e) => setEmail(e.target.value) }
                autoFocus
              />

            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger" onClick={handleClose} >
            Close
          </Button>
          <Button color="primary"   type='submit' 
          onClick={handleSubmit}>
            Edit
          </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleC} >
      <Alert onClose={handleC} severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>
        
        {/* <Button color ="primary"  type='submit' onClick={handleC}>
      Done
    </Button> */}

    </Snackbar>

        </Modal.Footer>



      </Modal>
      <Modal show={okay}  onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Biography </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle} >   
            <Form.Group >
              <Form.Label> New Biogrpahy:</Form.Label>
              <Form.Control
               rows="3"
                type="biography"
                value={Biography}
                onChange={(e) => setBiography(e.target.value) }
                autoFocus
              />

            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button outline color="danger" onClick={handleClose1} >
            Close
          </Button>
          <Button color="primary"   type='submit' 
          onClick={handle}>
            Edit
          </Button>
          
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                You have edited your email successfully!
          </Alert>  
        </Snackbar>
        <Button color ="primary"  type='submit' onClick={handleClose1}>
      Done
    </Button> 

        </Modal.Footer>



      </Modal>
     <Row>
          <Col sm="6" lg="6" xl="7" xxl="6">
            <Card>
              <CardBody>
                <CardTitle tag="h4"> My Information</CardTitle>
                <br/> 
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-user" aria-hidden="true"></i>&nbsp;{Info.InstrName}
                </CardText>
                <CardText className="text-muted" tag="h5">
                 {stars}
                </CardText>
                <br/>
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-globe" aria-hidden="true"></i> &nbsp;{Info.InstrCountry}
                </CardText>
                <br/>
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp;{Info.InstrEmail}
                <Col className="text-end">
                <Button className="btn" color="primary" size="lg"  onClick={handleShow} > Edit Email    </Button> </Col>   </CardText> 
              
                <br/>
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-book" aria-hidden="true"></i> &nbsp; {Info.Biography} 
                <Col className="text-end">
                <Button className="btn" color="primary" size="lg"  onClick={handleOkay} > Edit Biography    </Button>   </Col>   </CardText> 
               
             

              </CardBody>
            </Card>
            <Col sm="6" lg="6" xl="6">
            <Card>
                <CardBody  className="text-center">
                <img 
              src={user1}
                className="rounded-circle"
                alt="avatar"
               width="45"
               height="45"
          />
                    <CardText  className="text-muted" tag="h5">
                        <br/>
                    <CardTitle tag="h5">"{Info.InstrReview}"</CardTitle>
        
                    </CardText>
                </CardBody>
            </Card>
            </Col>

            <row sm="6" lg="6" xl="6">
            <Card>
                <CardBody  className="text-center">
                    <CardText  className="text-muted" tag="h5">
                        <br/>
                    <CardTitle tag="h5"><Button  onClick={navigateToBalance} > Check my Balance
                        </Button></CardTitle>
        
                    </CardText>
                </CardBody>
            </Card>
            </row>
          </Col>
         

        </Row>

    </div>
  );


}


export default InstructorInfo ;