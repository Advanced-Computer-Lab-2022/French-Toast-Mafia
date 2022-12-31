import Accordion from 'react-bootstrap/Accordion';
import { Card, CardBody, CardSubtitle, CardText, CardImg, CardTitle, Button, Row, Col } from "reactstrap";
import {useState, useEffect} from 'react';
import { viewSubtitle } from '../../api/axios';

  const Subtitle = ({subtitle}) => {

    const [sub,setSub] = useState([])
    const [video,setVideo] = useState([1])
    const [Exercise,setExercise] = useState([1])
      
    useEffect(() => {
        viewSubtitle(subtitle).then(json => {
        setSub(json)
        setVideo(json.Video)
        setExercise(json.Exercise)
        })
      }, []);

    return (
      <div>
        <Accordion.Item eventKey={sub.Title}>
            <Accordion.Header>
                <Col>
                    {sub.Title}
                </Col> 
                <Col>
                    <CardText className="text-muted" tag="h6"><span class="bi bi-clock"></span> &nbsp;{sub.Duration} hour(s) to complete</CardText>
                </Col>
            </Accordion.Header>
            <Accordion.Body>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="bi bi-text-center"></i>
            &nbsp;
                {sub.Description}
            </Accordion.Body>
            <Accordion.Body>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="bi bi-play-btn"></span> {video?.length? video.length : "0" } video(s)  
            </Accordion.Body>
            <Accordion.Body>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="bi bi-pencil-square"></span> {Exercise?.length? Exercise.length : "0"} Exercise(s)  
            </Accordion.Body>
        </Accordion.Item>
      </div>
    );
  };
  
  export default Subtitle;
  