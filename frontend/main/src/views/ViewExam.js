import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useLocation } from 'react-router-dom';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Typography from '@mui/material/Typography';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const { useState, useEffect } = require("react");


const ViewExam = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [Mcqs, setMcq] = useState([])
  const navigate = useNavigate();

  const search = useLocation().search;
  const userId = new URLSearchParams(search).get('userId');
  const courseId = new URLSearchParams(search).get('courseId');
  const examId = new URLSearchParams(search).get('examId');




  useEffect(function () {
    axios.get(`http://localhost:5000/Exams/getExamById?id=${courseId}`).then(
      (res) => {
        const Mcqs = res.data
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
  //const handleShow = () => setShow(true);
  const handleCancel = () => setShow(false);

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSubmit = (event) => {
    setShow(true);
    event.preventDefault();
    console.log("AnswersArray");
    console.log(AnswersArray);
    const data = new FormData();
    data.append("Answer", AnswersArray);
    console.log(data.get("Answer"));

    axios.post(`http://localhost:5000/Exams/solveExam?id=${examId}&userId=${userId}`, {
        Answer: data.get("Answer")

    }).then((res) => {
        //get exam created id
        setScore(res.data.score);
        setTotal(res.data.total);
    }).catch((err) => {
        console.log(err);
    });
   
  };




  return (


    <div className="UsersList">


      <ul>
        <h1 style={heading}>Welcome to Your Exam!</h1>

        {Mcqs.map((q, i) => {
          return (
            <div key={i}>

              {/* <h2 className="question-text" >Subject: { q.title} , Description: { q.description}</h2> */}

              <RadioGroup name="use-radio-group"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <div className="question-card">
                  <h112 className="question-text" > <strong> Question :</strong> {q.question}</h112>
                  <div>
                    <FormControlLabel  onChange={handleChange}  value={q.choice1} label={q.choice1} control={<Radio />} />
                    <FormControlLabel  onChange={handleChange}  value={q.choice2} label={q.choice2} control={<Radio />} />
                    <FormControlLabel  onChange={handleChange}  value={q.choice3} label={q.choice3} control={<Radio />} />
                    <FormControlLabel  onChange={handleChange}  value={q.choice4} label={q.choice4} control={<Radio />} />
                  </div>
                </div>

                <h1></h1>

              </RadioGroup>

            </div>

          )
        })}
        <Button variant="contained" size="small"
          style={{
            display: 'flex', height: 40, marginTop: 10,
            borderBlockColor: '#1aac83', borderTop: '#1aac83',
            borderBottom: '#1aac83', borderRight: '#1aac83',
            borderLeft: '#1aac83'
          }}

          onClick={handleSubmit} >
          Submit
        </Button>
      </ul>
      <Modal
                            show={show}
                            onHide={handleCancel}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Exam Submitted!</Modal.Title>
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




    </div>
  )
}
export default ViewExam;