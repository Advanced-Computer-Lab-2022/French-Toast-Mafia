import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
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
    const [InstrEmail, setEmail] = useState('');
    const[err , setErr] = useState(null)

    const[done , setDone] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setDone(true);
            setErr(null)
            console.log('Email has been edited', json)
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
          <Form onSubmit={ handleSubmit} >   
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
          <Button color="primary"   type='submit' onClick={handleSubmit} >
            Edit
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
                <br/>
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp;{Info.InstrEmail} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button className="btn" color="primary" size="lg"  onClick={handleShow} > Edit Email    </Button>    </CardText> 
                <br/>
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-globe" aria-hidden="true"></i> &nbsp;{Info.InstrCountry}
                </CardText>
                <br/>
                <CardText className="text-muted" tag="h5">
                <i className="fa fa-book" aria-hidden="true"></i> &nbsp; {Info.Biography}
                </CardText>
                <br/>
                <CardText className="text-muted" tag="h5">
                 My rating : &nbsp;{rate} 
                </CardText>
             

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