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
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const { useState } = require("react");


const heading =  {
  fontSize: '72 px' ,
  color : 'black',
  textAlign:'center'
}

const ExamIsDone = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([]);
    const search = useLocation().search;
    const examId = new URLSearchParams(search).get('examId');
    const userId = new URLSearchParams(search).get('userId');
    const courseId = new URLSearchParams(search).get('courseId');
  
    useEffect(function () {
      axios.get(`http://localhost:5000/Exams/getAnswers?id=${examId}`).then(
        (res) => {
          const e = res.data
          console.log(e)
          setAnswers(e)
        }
      );
    }, []);

  return(
    
    <div class="center">
        <h1 style={heading} > Exam Solution</h1> 

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" style={{ color: '#FFF' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Question</StyledTableCell>
              <StyledTableCell align="center">Answer</StyledTableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((a) => (
              <TableRow>
                <TableCell align="center">{a.question}</TableCell>
                <TableCell align="center">{a.answers}</TableCell>
     

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" 
      sx={{ marginTop: 2, marginBottom: 2, marginLeft: 65, marginRight: 2 }}
      onClick={() => navigate(`/UserCoursePage?courseId=${courseId}&userId=${userId}`)}>Course Page</Button>


        
    </div>


 );

};


export default ExamIsDone;