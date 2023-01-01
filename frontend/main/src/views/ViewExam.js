import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Col, Row , CardDeck, Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, CardGroup} from "reactstrap";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const { useState, useEffect } = require("react");


const ViewExam = () => {
  const [Mcqs, setMcq] = useState([])
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const navigate = useNavigate();

  const search = useLocation().search;
  const userId = new URLSearchParams(search).get('userId');
  const courseId = new URLSearchParams(search).get('courseId');
  const examId = new URLSearchParams(search).get('examId');




  useEffect(function () {
    axios.get(`http://localhost:5000/Exams/getExam?id=${examId}`).then(
      (res) => {
        const Mcqs = res.data
        setTitle(Mcqs.title)
        setDescription(Mcqs.description)
        setMcq(Mcqs.mcq)
      }
    );
  }, []);



  const heading = {
    fontSize: '72 px',
    color: 'black',
    textAlign: 'center',

  }


  // const [value, setValue] = React.useState('');
  const AnswersArray = [];

  const handleChange = (event) => {
    AnswersArray.push(event.target.value);
  };

 

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  //const handleShow = () => setShow(true);
  const handleCancel = () => setShow(false);
  const handleCancel2=()=>setShow2(false);

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("AnswersArray");
    console.log(AnswersArray);
    const data = new FormData();
    data.append("Answer", AnswersArray);
    //console.log(data.get("Answer"));

    axios.post(`http://localhost:5000/Exams/solveExam?id=${examId}&userId=${userId}`, {
      // Answer: data.get("Answer")
      Answer: AnswersArray

  }).then((res) => {
      //get exam created id
      setScore(res.data.score);
      setTotal(res.data.total);
      
      console.log(res.data.score);
      console.log(res.data.total);
      
      if (res.data.score/res.data.total >= 0.5) {
        setShow(true);
      }
      else {
          setShow2(true);
      }
  }).catch((err) => {
    setOpen(true);
    console.log(err.response.data.message);
    setErrorMessage(err.response.data.message);
  });
   
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleRetake = () => {
    handleCancel2();
    window.location.reload(false);
    navigate(`/ViewExam?courseId=${courseId}&userId=${userId}&examId=${examId}`)
  }

  var i=1;

  const displayQuestions=Mcqs.map((q) => {
    return (
      <>
      <hr/>
       <CardSubtitle tag="h5" className="text-muted">{i++}. &nbsp;{q.question}</CardSubtitle>
       <hr/>
        {/* <h2 className="question-text" >Subject: { q.title} , Description: { q.description}</h2> */}

        <RadioGroup name="use-radio-group"
          style={{ display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'left', 
          justifyContent: 'left' }}
        >
              <FormControlLabel  onChange={handleChange}  value={q.choice1} label={q.choice1} control={<Radio />} />
              <FormControlLabel  onChange={handleChange}  value={q.choice2} label={q.choice2} control={<Radio />} />
              <FormControlLabel  onChange={handleChange}  value={q.choice3} label={q.choice3} control={<Radio />} />
              <FormControlLabel  onChange={handleChange}  value={q.choice4} label={q.choice4} control={<Radio />} />
        </RadioGroup>
        <br />
      </>
    )
  })






  return (


    <div>


      <ul>
        <h1 style={heading}>Welcome to Your Exam!</h1>
        <Row>
    <Col lg="1"></Col>
      {/***Sales & Feed***/}
      <Col lg="10">
      <CardDeck>
        <Card >
          <CardBody>
      <Row>  
      
      <Card >
     
     <CardBody>
       <CardTitle tag="h4"> <span>Title: </span> {title} </CardTitle>    
       <CardSubtitle tag="h5" className="text-muted"><span>Description: </span>{description}</CardSubtitle>
       <hr/>

        {Mcqs?.length? displayQuestions : null}

       </CardBody>
        </Card>
      </Row> 
      </CardBody>
      </Card>
      </CardDeck>
      </Col>
      </Row>

        
        <Button variant="contained" size="large"
          style={{
            display: 'flex', height: 40, marginTop: 10,
            borderBlockColor: '#1aac83', borderTop: '#1aac83',
            borderBottom: '#1aac83', borderRight: '#1aac83',
            borderLeft: '#1aac83',width: 200, marginLeft: 470
          }}

          onClick={handleSubmit} >
          Submit
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                  {errorMessage}
                              </Alert>
                          </Snackbar>
      </ul>
      <Modal
                            show={show}
                            onHide={handleCancel}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Congrats! You Passed The Exam!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Typography id="modal-modal-description" sx={{ mt: 0,ml:20 }}>
                                  Your Score is: <strong> {score}</strong> 
                                </Typography>
                                <Typography sx={{ml:25}}>
                                  Out of: <strong>{total} </strong> 
                                </Typography>

                                <Button variant="contained" size="small"
                                    style={{
                                        display: 'flex', height: 40, marginTop: 10,
                                        borderBlockColor: '#1aac83', borderTop: '#1aac83',
                                        borderBottom: '#1aac83', borderRight: '#1aac83',
                                        borderLeft: '#1aac83', marginLeft: 150
                                    }}

                                    onClick={() => {
                                        navigate(`/ExamIsDone?courseId=${courseId}&userId=${userId}&examId=${examId}`)
                                    }} >
                                   View Exam Solution
                                </Button>
                    
                            </Modal.Body>


                        </Modal>



                        <Modal
                            show={show2}
                            onHide={handleCancel2}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>You scored less than 50% !</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Typography id="modal-modal-description" sx={{ mt: 0,ml:20 }}>
                                  Your Score is: <strong> {score}</strong> 
                                </Typography>
                                <Typography sx={{ml:25}}>
                                  Out of: <strong>{total} </strong> 
                                </Typography>

                                <Button variant="contained" size="small"
                                    style={{
                                        display: 'flex', height: 40, marginTop: 10,
                                        borderBlockColor: '#1aac83', borderTop: '#1aac83',
                                        borderBottom: '#1aac83', borderRight: '#1aac83',
                                        borderLeft: '#1aac83', marginLeft: 175
                                    }}

                                    onClick={() => {
                                        handleRetake();
                                    }} >
                                   Retake Exam
                                </Button>
                    
                            </Modal.Body>


                        </Modal>





    </div>
  )
}
export default ViewExam;