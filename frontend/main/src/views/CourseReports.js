import { Row, Col, Card, CardBody, CardTitle} from "reactstrap";
import { viewCourseReports } from "../api/axios";
import {useState, useEffect} from 'react';
import ReportList from "../components/dashboard/reportList";

import { useLocation } from 'react-router-dom';

const Home = () => {

  const search = useLocation().search;
  const cId = new URLSearchParams(search).get('id');

  const[reports,setReports] = useState([])
  
 
  useEffect(() => {
    viewCourseReports(cId).then(json => {
      setReports(json)
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
          <span class="bi bi-flag"></span>&nbsp;Reported Issues
          </CardTitle>
         
        </Card>
        <ReportList Reports={reports} />
      </Col>
    </Row>
  );
};

export default Home;
