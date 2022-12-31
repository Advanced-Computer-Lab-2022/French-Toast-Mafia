import { Row, Col, Card, CardBody, CardTitle} from "reactstrap";
import { viewCourseRequests } from "../api/axios";
import {useState, useEffect} from 'react';
import RequestList from "../components/dashboard/requestList";

import { useLocation } from 'react-router-dom';

const Home = () => {

  const search = useLocation().search;
  const cId = new URLSearchParams(search).get('id');

  const[request,setRequests] = useState([])
  
 
  useEffect(() => {
    viewCourseRequests(cId).then(json => {
      setRequests(json)
      // console.log(reports)
    })
  }, []);

  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h5" className="border-bottom p-3 mb-0">
          <span class="bi bi-flag"></span>&nbsp;Requets 
          </CardTitle>
         
        </Card>
        <RequestList Request={request} />
      </Col>
    </Row>
  );
};

export default Home;
