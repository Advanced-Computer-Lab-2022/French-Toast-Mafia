import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {useState, useEffect} from 'react';
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";

const InstructorInfo =()=> {
    const search = useLocation().search;
    const InstrId = new URLSearchParams(search).get('instrId');
    const [Info, setInfo] = useState([]);

  
    useEffect(function () {
      axios.get(`http://localhost:5000/Instrcutor/viewInstrInfo?instrId=${InstrId}`).then(
        (res) => {
          const resInfo = res.data
          setInfo(resInfo)
        }
      );
    }, []);

  return (
    <div>
     <Row>
          <Col sm="6" lg="6" xl="7" xxl="6">
            <Card>
              <CardBody>
                <CardTitle tag="h5"> My Information</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {Info.InstrName}
                </CardSubtitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {Info.InstrEmail}
                </CardSubtitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {Info.InstrCountry}
                </CardSubtitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {Info.Biography}
                </CardSubtitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {Info.InstrReview}
                </CardSubtitle>

              </CardBody>
            </Card>
          </Col>

        </Row>

    </div>
  );


}





export default InstructorInfo;