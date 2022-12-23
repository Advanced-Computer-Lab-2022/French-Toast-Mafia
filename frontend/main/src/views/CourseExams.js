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
                console.log(resExam)
                setExams(resExam)
            }
        );
    }, []);


    
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
      </TableRow>
    </TableHead>

    <TableBody>
    {Array.isArray(exams) ?exams.map((e) => (
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            width: "100%"
            }
        }}
          >
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
        </TableRow>
      )):
      <TableRow
      hover
      sx={{
          "&:hover":{
          cursor: "pointer",
          backgroundColor: "#f5f5f5",
          width: "100%"
          }
      }}
        >
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
      </TableRow>
      }
      
    </TableBody>
  </Table>
</TableContainer>
      

        
    </div>
               

    )
}
export default CourseExams;