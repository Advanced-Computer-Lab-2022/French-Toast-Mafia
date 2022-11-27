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

const queryParameters = new URLSearchParams(window.location.search)
const courseId = queryParameters.get("courseId")
console.log(courseId)


const ExamQuestions = () => { 
    const [questions,setQuestions] = useState([]);
    
    const getQuestions =  async () => {
         await axios.get(`http://localhost:5000/Course/viewCourseExam?id=${courseId}`).then(
        (res) => { 
            const qs = res.data
            console.log(qs)
            setQuestions(qs)
            
        }
         );
    

    }
    return(

        // visualize authors in a table map over authors
        <div className="Questions">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getQuestions}
            margin="normal"
            padding="normal"
            >Load Exam Questions</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"  >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Question</StyledTableCell>
            <StyledTableCell align="center">Answer</StyledTableCell>        
          </TableRow>
        </TableHead>

        <TableBody >
          {questions.map((q) => (
            <TableRow  hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }} >
              <TableCell align="center" onClick={()=> console.log("clicky clicky")}>{q.Question}</TableCell>
              <TableCell align="center">{q.Answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}
export default ExamQuestions;