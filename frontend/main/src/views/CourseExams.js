import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Modal from "react-bootstrap/Modal";
import Snackbar from '@mui/material/Snackbar';

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

const CourseExams = () => { 
    const [exams,setExams] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
    const userId = new URLSearchParams(search).get('userId');
    const courseId = new URLSearchParams(search).get('courseId');
    const navigate = useNavigate();


   useEffect(function () {
        axios.get(`http://localhost:5000/Exams/getExamById?id=${courseId}`).then(
            (res) => { 
                const resExam = res.data
                //console.log(resExam)
                setExams(resExam)
            }
        );
    }, []);

    const [grades,setGrades] = useState([]);

    const getGrade = (examId) => {
      axios.get(`http://localhost:5000/User/getUserGrades?id=${userId}&examId=${examId}`).then(
          (res) => {
              const resGrades = res.data;
              console.log(resGrades);
              setGrades(resGrades);
          }
      );

      setShow(true)
    }


              
  const [show, setShow] = useState(false);
  const handleCancel = () => setShow(false);

    
    return(
     
      <div className="UsersList">
        <h1 style={{textAlign: "center"}}>Course Information</h1>


      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Exam Title</StyledTableCell>
        <StyledTableCell align="center">Exam Description</StyledTableCell>
        <StyledTableCell align="center">Exam Page</StyledTableCell>
        <StyledTableCell align="center">Exam Grade</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
    {Array.isArray(exams) ?exams.map((e) => (
        <TableRow>
          <TableCell align="center">{e.title}</TableCell>
          <TableCell align="center">{e.description}</TableCell>
          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width: 210, height: 40, color: '#FFF', marginTop: 10 }}
              onClick={() => 
                //window.location.href=`/CourseInstructor?courseId=${courseId}&userId=${userId}`
                navigate(`/ViewExam?courseId=${courseId}&userId=${userId}&examId=${e._id}`)
              }
              margin="normal"
              padding="normal"
            >Enter Exam</Button>
            </Box>
          </TableCell>
          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="outlined"
              style={{ width: 100, height: 50, marginTop: 10 }}
              onClick={() => 
                getGrade(e._id)
              }
              margin="normal"
              padding="normal"
            >View Grade</Button>
            </Box>
          </TableCell>
        </TableRow>
      )):
      <TableRow>
        <TableCell align="center">{exams.title}</TableCell>
        <TableCell align="center">{exams.description}</TableCell>
        <TableCell align="center">
        <Box sx={{marginBottom: 2}}>
          <Button variant="contained"
            style={{ width: 210, height: 40, color: '#FFF', marginTop: 10 }}
            onClick={() => 
              //window.location.href=`/CourseInstructor?courseId=${courseId}&userId=${userId}`
              navigate(`/ViewExam?courseId=${courseId}&userId=${userId}&examId=${exams._id}`)
            }
            margin="normal"
            padding="normal"
          >Enter Exam</Button>
          </Box>
        </TableCell>
        <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="outlined"
              style={{ width: 100, height: 40, marginTop: 10 }}
              onClick={() => 
                getGrade(exams._id)
              }
              margin="normal"
              padding="normal"
            >View Grade</Button>
            </Box>
          </TableCell>
  
      </TableRow>
      }
      
    </TableBody>
  </Table>
</TableContainer>
      
<Modal
        show={show}
        onHide={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header closeButton>
          <Modal.Title>Exam Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 17,mb:3}}>
            Your exam grade is: <strong>{grades} %</strong>
          </Typography>

        </Modal.Body>


      </Modal>

        
    </div>
               

    )
}
export default CourseExams;