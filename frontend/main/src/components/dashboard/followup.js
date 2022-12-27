import {
    Card,
    CardBody,
    CardSubtitle,
    Col,
    Row
  } from "reactstrap";
  import {useState, useEffect} from "react";
  import { getReporter } from "../../api/axios";

  import user3 from "../../assets/images/users/user3.jpg";

const Followup = ({followup}) => {
    const [username, setUsername] = useState("Loading..");
    
  useEffect(() => {
    getReporter(followup[0]).then(json => {
      setUsername(json)
    })
  }, []);

    return (
        <Card >
            <CardBody>
            <Row justify-content = "true">
                <Col lg="2" className="text-center">
                <img 
                    src={user3}
                    className="rounded-circle "
                    alt="avatar"
                    width="45"
                    height="45"
                />
               <br/>
               <CardSubtitle className="text-center" style={{margin:"auto",    
                    display: "block"}}>{username}</CardSubtitle>
               </Col>
                <Col>
                    <div class="vr" style={{height:"50px"}}></div>
                </Col>
                <Col lg="9"> 
                    <br/>
                <CardSubtitle className="text-left" style={{margin:"auto",    
                    display: "block"}}>{followup[1]}</CardSubtitle>
                </Col>
                </Row>
         </CardBody>
      </Card>
    );
  };
  
  export default Followup;
  