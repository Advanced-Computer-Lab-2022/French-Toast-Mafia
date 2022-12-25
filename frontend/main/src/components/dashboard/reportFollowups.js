import { Row, Col, Card, CardBody, CardTitle,CardSubtitle, CardText} from "reactstrap";
import { getReport, getReporter } from "../api/axios";
import {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import Report from "../components/dashboard/report";

import user1 from "../assets/images/users/user1.jpg";


const ReportFollowup = () => {

    const[report,setReport] = useState([])
    const[reporter, setReporter] = useState("Loading...")
    const[followup,setFollowup] = useState([])
    const[desc,setDesc] = useState("Loading...")

    var typeIcon;
    var statusIcon;

    const search = useLocation().search;
    const rId = new URLSearchParams(search).get('id');

    useEffect(() => {
        if(rId != null){
            getReport(rId).then(json =>{
                setReport(json);
                setFollowup(json.followup);
                setDesc(json.description)
                getReporter(json.reported_by).then(name =>{
                    setReporter(name);
                })
           })
         
        }
    }, []);
    if(report != null){
        console.log(report)
        console.log(reporter)
    }

    if(report.type === "Technical")
        typeIcon = <span class="bi bi-tools" style={{ fontSize: "25px"}}></span>;
    else if(report.type === "Financial")
        typeIcon = <span class="bi bi-cash-coin" style={{ fontSize: "25px"}}></span>;
    else
        typeIcon = <span class="bi bi-question-lg" style={{ fontSize: "25px"}}></span>

    if(report.status === "Unseen")
        statusIcon = <span className="p-2 bg-secondary rounded-circle d-inline-block ms-3"></span>
    else if(report.status === "Pending")
        statusIcon = <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
    else 
        statusIcon = <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>

    return (
        <Row>
        <Col>
            <Card>  
                <CardTitle tag="h5" className="border-bottom p-3 mb-0">&nbsp;Report <text className="mb-2 text-muted" tag="h6">#{rId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{typeIcon}&nbsp;&nbsp;{report.type}&nbsp;&nbsp;{statusIcon} {report.status}</text> </CardTitle>
            <CardBody className="p-4">
                <Row justify-content>
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
                <CardTitle tag="h5" className="border-bottom p-3 mb-0"><span class="bi bi-chat-left-dots"></span>&nbsp;&nbsp;Follow-ups:</CardTitle>
            </Card>
            {/* <CourseList searchResults={searchResults} /> */}
        </Col>
        </Row>
    );
};

export default ReportFollowup;
