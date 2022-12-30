import { Row, Col, Card, CardBody, CardTitle,CardSubtitle, Input, Button} from "reactstrap";
import { getRequest, getRequester, getRequestedCourse} from "../api/axios";
import {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';

import {Form} from "react-bootstrap"
import user1 from "../assets/images/users/user1.jpg";


const ViewRequest = () => {

    const[request,setRequest] = useState([])
    const[requester, setRequester] = useState('')
    const[requested, setRequested] = useState('')
    const[status, setStatus] = useState("")

    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({});

    var statusIcon;

    const search = useLocation().search;
    const rId = new URLSearchParams(search).get('id');
   // console.log(rId);

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
        console.log('hhhhhhhhh');
        getRequest(rId).then(json =>{
        setRequest(json);
        console.log(json);
        console.log('yyyyyyyyyyyyy');
        setStatus(json.status)
        console.log(json.status);
        getRequester(json.requested_by).then(name =>{
        setRequester(name);
        getRequestedCourse(json.requested_course).then(name =>{
        setRequested(name);
        console.log(json);
        console.log(json.requested_by);
       
            })
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
        const { id, comment } = form
        const newErrors = {}

        if(!id || id === "")
            newErrors.id = "Please enter a valid id"
        if(!comment || comment === "")  
            newErrors.comment = "Please enter a comment"

        return newErrors
    }

        // const handleSubmit = async (e) => {

        //     e.preventDefault();

        //     const formErrors = validateForm()

        //     if(Object.keys(formErrors).length > 0){
        //         setErrors(formErrors)
        //     }
        //     else{
                
        //         newFollowUp[0] = form.id;
        //         newFollowUp[1] = form.comment;

        //         await fetch(`http://localhost:5000/Report/addFollowup?id=${rId}`,{
        //             method: 'POST',
        //             body: JSON.stringify({"id" : form.id, "comment": form.comment}),
        //             headers : {
        //                 'Content-Type':'application/json'
        //             }
        //         })
        //         window.location.reload();
        //     }
        // }

     
    return (
        <Row>
        <Col>
            <Card>  
                <CardTitle tag="h5" className="border-bottom p-3 mb-0">&nbsp;Request <text className="mb-2 text-muted" tag="h6">#{rId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{statusIcon} {status}</text> </CardTitle>
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
                    display: "block"}}>{requester} {requested}</CardSubtitle>
               </Col>
                <Col>
                    <div class="vr" style={{height:"75px"}}></div>
                </Col>
                <Col lg="9">  
                <Row>
                    </Row>  
                </Col>
                </Row>
            
            </CardBody>
            </Card>
            
            <Card>
                <CardBody>
               
           
            
                </CardBody>
            </Card>
        </Col>
        </Row>
    );
};

export default ViewRequest;
