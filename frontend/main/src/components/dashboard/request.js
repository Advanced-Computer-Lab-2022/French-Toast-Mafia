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
  import { getRequester } from "../../api/axios";

  const Request = ({id, request}) => {

    const [requester, setRequester] = useState("Loading..");

    const navigate = useNavigate();


    const rId = id;
    const requesterId = request.requested_by;
    const status = request.status;

    var statusIcon;

    
  useEffect(() => {
      getRequester(requesterId).then(json => {
      setRequester(json)
    })
  }, []);

    
    if(status === "Unseen")
        statusIcon = <span className="p-2 bg-secondary rounded-circle d-inline-block ms-3"></span>
    else if(status === "Pending")
        statusIcon = <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
    else 
        statusIcon = <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>


    return (
        <Card >
            <Col>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-muted">&nbsp;&nbsp;{statusIcon} {status}</CardTitle>
            </Col>
      
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <CardBody className="p-4">
            <Row>  
                <Col sm="6" lg="6" xl="7" xxl="10">

                    <br/>   
                    <CardSubtitle className="mb-2 text-muted" tag="h6"><span class="bi bi-person"></span> &nbsp;{requester}</CardSubtitle>
                    <Button color="primary" onClick={() => navigate(`/viewReport?id=${rId}`)}>View Request</Button>   
                </Col>
               
                 
               
            </Row>
        
        </CardBody>
        </div>
       
      </Card>
    );
  };
  
  export default Request;
  