import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button, Row, Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Input,
    Alert
    } from "reactstrap";


    const InstructorBalance =()=>{

        const [balance, setBalance] = useState("");
        const [Info, setInfo] = useState([]);
        
    const search = useLocation().search;
    const InstrId = new URLSearchParams(search).get('instrId');

    useEffect(function () {
        axios.get(`http://localhost:5000/Instructor/calculateMoney?instrId=${InstrId}`).then(
          (res) => {
            const resBalance = res.data
            setBalance(resBalance)
          }
        );
      }, []);

      useEffect(function () {
        axios.get(`http://localhost:5000/Instructor/viewInstrInfo?instrId=${InstrId}`).then(
          (res) => {
            const resInfo = res.data
            setInfo(resInfo)
          }
        );
      }, []);


      return (
        <div>
            <Col sm="6" lg="6" xl="4">
             <Card>
                <CardBody >
            
                    <CardText  className="text-muted" tag="h5">
                        <br/>
                    <CardTitle tag="h5"> Your name : &nbsp;{Info.InstrName}</CardTitle>
                    <CardText> Your Current Balance : &nbsp; {balance} EGP </CardText>
                    </CardText>
                </CardBody>
            </Card>
            </Col>
        </div>
      );
    }





    export default InstructorBalance;