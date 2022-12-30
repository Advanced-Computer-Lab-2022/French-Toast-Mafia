import { Row, Col, Card, CardBody, CardTitle,CardSubtitle, Input, Button, RadioGroup} from "reactstrap";
import { getRequest, getRequester } from "../api/axios";
import {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';

import {Form} from "react-bootstrap"

import user1 from "../assets/images/users/user1.jpg";


const ViewRequestAdmin = () => {

    const[request,setRequest] = useState([])
    const[requester, setRequester] = useState("Loading...")
    const[status, setStatus] = useState("Unseen")
    const[problemStatus, setProblemStatus] = useState("Pending");


    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});

    var statusIcon;


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
        getRequest(rId).then(json =>{
            setRequest(json);
            setStatus(json.status)
            getRequester(json.requested_by).then(name =>{
            setRequester(name);
            })
        })
    }, []);


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


                await fetch(`http://localhost:5000/Request/updateRequestStatus?id=${rId}`,{
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
                <CardTitle tag="h5" className="border-bottom p-3 mb-0">&nbsp;Request <text className="mb-2 text-muted" tag="h6">#{rId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{statusIcon} {status}</text> </CardTitle>
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
                    display: "block"}}>{requester}</CardSubtitle>
               </Col>
                <Col>
                    <div class="vr" style={{height:"75px"}}></div>
                </Col>
                </Row>
            
            </CardBody>
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

export default ViewRequestAdmin;
