import { Col, Row, Alert, ListGroup, CardBody, Card, CardTitle} from "reactstrap";

import { useLocation } from 'react-router-dom';
import { viewCourse } from "../api/axios";
import {useState, useEffect} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


import LatestReports from "../components/dashboard/LatestReports";
import LatestRequests from "../components/dashboard/LatestRequests";

import { getAllReports } from "../api/axios";

import { getAllRequests } from "../api/axios";

const AdminDashboard = () => {
    const [ref,setRef] = useState(false);
    const search = useLocation().search;
    const aId = new URLSearchParams(search).get('id');

    const[reports, setReports] = useState([ ]);
    const[requests, setRequests] = useState([ ]);
  

    useEffect(() => {
        getAllReports().then(json => {
          setReports(json)
        })
        getAllRequests().then(req => {
          setRequests(req)
        })
      }, []);

  return (
    <div>
      {/***Top Cards***/}
      {/* <div>
            <Alert color="success" isOpen={reportAlert} toggle={onDismiss.bind(null)}>
              Thank you for reporting the issue.
            </Alert>
          </div> */}
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="6">
            <LatestReports reports = {reports}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="6">
            <LatestRequests requests = {requests}/>
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
      </Row>

    </div>
  );
};

export default AdminDashboard;
