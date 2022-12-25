import { Row, Col, Card, CardBody, CardTitle,CardSubtitle, Input, Button, RadioGroup} from "reactstrap";
import { getReport, getReporter } from "../api/axios";
import {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';

import {Form} from "react-bootstrap"
import FollowupList from "../components/dashboard/followupList";
import user1 from "../assets/images/users/user1.jpg";


const ViewReportAdmin = () => {

    const[report,setReport] = useState([])
    const[reporter, setReporter] = useState("Loading...")
    const[followup,setFollowup] = useState([])
    const[desc,setDesc] = useState("Loading...")
    const[type, setType] = useState("Other")
    const[status, setStatus] = useState("Unseen")
    const[problemStatus, setProblemStatus] = useState("Pending");


    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});

    var typeIcon;
    var statusIcon;
    var newFollowUp = [];

    const search = useLocation().search;
    const rId = new URLSearchParams(search).get('id');

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

    // console.log(rId)
    useEffect(() => {
       
        getReport(rId).then(json =>{
            setReport(json);
            setFollowup(json.follow_up);
            setDesc(json.description)
            setStatus(json.status)
            setType(json.type)
            getReporter(json.reported_by).then(name =>{
                setReporter(name);
            })
        })
    }, []);


    if(type === "Technical")
        typeIcon = <span className="bi bi-tools" style={{ fontSize: "25px"}}></span>;
    else if(type === "Financial")
        typeIcon = <span className="bi bi-cash-coin" style={{ fontSize: "25px"}}></span>;
    else
        typeIcon = <span className="bi bi-question-lg" style={{ fontSize: "25px"}}></span>

    if(status === "Unseen")
        statusIcon = <span className="p-2 bg-secondary rounded-circle d-inline-block ms-3"></span>
    else if(status === "Pending")
        statusIcon = <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
    else 
        statusIcon = <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>


    const validateForm = () =>{
        const {status} = form
        const newErrors = {}

        if(!status || status === "")
            newErrors.status = "Please choose a valid status"

        return newErrors
    }

        const handleSubmit = async (e) => {

            e.preventDefault();

            const formErrors = validateForm()

            if(Object.keys(formErrors).length > 0){
                setErrors(formErrors)
            }
            else{


                await fetch(`http://localhost:5000/Report/updateStatus?id=${rId}`,{
                    method: 'POST',
                    body: JSON.stringify({"status" : form.status}),
                    headers : {
                        'Content-Type':'application/json'
                    }
                })
                window.location.reload();
            }
        }

     
    return (
    
    <Row>   
        
        <Col>
            <Card>  
                <CardTitle tag="h5" className="border-bottom p-3 mb-0">&nbsp;Report <text className="mb-2 text-muted" tag="h6">#{rId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{typeIcon}&nbsp;&nbsp;{type}&nbsp;&nbsp;{statusIcon} {status}</text> </CardTitle>
            <CardBody className="p-4">
                <Row justify-content = "true">
                <Col lg="2" className="text-center">
                <img 
                    src={user1}
                    className="rounded-circle "
                    alt="avatar"
                    width="45"
                    height="45"
                />
               <br/>
               <CardSubtitle className="text-center" style={{margin:"auto",    
                    display: "block"}}>{reporter}</CardSubtitle>
               </Col>
                <Col>
                    <div class="vr" style={{height:"75px"}}></div>
                </Col>
                <Col lg="9">  
                <Row>
                <CardSubtitle className="text-left mb-2 text-muted">Description: </CardSubtitle>
                    </Row>  
                <CardSubtitle className="text-left" style={{margin:"auto",    
                    display: "block"}}>{desc}</CardSubtitle>
                </Col>
                </Row>
            
            </CardBody>
            </Card>
            <Card>  
            <Col lg="2" className="text-center">
                <CardTitle tag="h5" className="border-bottom p-3 mb-0"><span class="bi bi-chat-left-dots"></span>&nbsp;&nbsp;Follow-ups:</CardTitle>
                </Col>
                <FollowupList Followups={followup}/>
            </Card>
            
            <Card>
                <CardBody>
               
            <Form>      
            <CardTitle tag="h5" >Mark Post as:</CardTitle>
             <br/>
                <Form.Group controlId="status">
                    <Form.Select placeholder="Unseen"
                        // type="text"
                        // placeholder="Enter id"
                        value = {form.status}
                        onChange={(e) => setField('status', e.target.value)}
                        isInvalid={!!errors.status}
                    >
                        <option>Unseen</option>
                        <option value = "Pending">Pending</option>
                        <option value = "Resolved">Resolved</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {errors.status}
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-end'}}>
                    <Form.Group controlId="submit">
                    <Button type="submit" color="primary" onClick={handleSubmit}>
                        Post
                    </Button>
                    </Form.Group>
                </div>
            
            </Form> 
            
                </CardBody>
            </Card>
        </Col>
    </Row>
    );
};

export default ViewReportAdmin;
