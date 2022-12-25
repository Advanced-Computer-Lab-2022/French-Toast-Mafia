import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
    Col,
    Row
  } from "reactstrap";
  import { useNavigate } from "react-router-dom";
  import {useState, useEffect} from "react";
  import { getReporter } from "../../api/axios";

  const Report = ({id, report, followup}) => {

    const [reporter, setReporter] = useState("Loading..");

    const rId = id;
    const reporterId = report.reported_by;
    const type = report.type;
    const status = report.status;
    var typeIcon;
    var statusIcon;

    
  useEffect(() => {
    getReporter(reporterId).then(json => {
      setReporter(json)
      // console.log(reports)
    })
  }, []);

    if(type === "Technical")
        typeIcon = <span class="bi bi-tools" style={{ fontSize: "25px"}}></span>;
    else if(type === "Financial")
        typeIcon = <span class="bi bi-cash-coin" style={{ fontSize: "25px"}}></span>;
    else
        typeIcon = <span class="bi bi-question-lg" style={{ fontSize: "25px"}}></span>
    
    if(status === "Unseen")
        statusIcon = <span className="p-2 bg-secondary rounded-circle d-inline-block ms-3"></span>
    else if(status === "Pending")
        statusIcon = <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
    else 
        statusIcon = <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>


    return (
        <Card >
            <Col>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-muted">{typeIcon}&nbsp;&nbsp;{type}&nbsp;&nbsp;{statusIcon} {status}</CardTitle>
            </Col>
      
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <CardBody className="p-4">
            <Row>  
                <Col sm="6" lg="6" xl="7" xxl="10">

                    <CardTitle tag="h5">{report.description}</CardTitle>
                    <br/>   
                    <CardSubtitle className="mb-2 text-muted" tag="h6"><span class="bi bi-person"></span> &nbsp;{reporter}</CardSubtitle>
                    <CardText className="mt-3 text-muted"><span class="bi bi-chat-left-dots"></span> &nbsp;({followup.length}) </CardText>
                    <Button color="primary" >View Report</Button>   
                </Col>
               
                 
               
            </Row>
        
        </CardBody>
        </div>
       
      </Card>
    );
  };
  
  export default Report;
  