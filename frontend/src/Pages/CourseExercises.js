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
import StarRating from '../Components/StarRating';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const theme = createTheme();

const { useState } = require("react");

const CourseExercises = () => { 

    const [questions,setQuestions] = useState([]);
    const params = new URLSearchParams(window.location.search);

    const getQuestions = async () => {
        await axios.get(`http://localhost:5000/Subtitle/getExcercisesQuestions?id=${params.get('courseId')}`).then(
            (res) => {
                const resQuestions = res.data
                console.log(resQuestions)
                setQuestions(resQuestions)
            }
        );
    }

    const [answers,setAnswers] = useState([]);
    const getAnswers = async () => {
        await axios.get(`http://localhost:5000/Subtitle/getExcercisesAnswers?id=${params.get('courseId')}`).then(
            (res) => {
                const resAnswers = res.data
                console.log(resAnswers)
                setAnswers(resAnswers)
            }
        );
    }

    
    return(
     
      <div className="UsersList">
     <Box  display='flex' flexDirection= {"row"}>
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{width:300, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10,marginRight:10}}
      onClick={getQuestions}
      margin="normal"
      padding="normal"
      >View Course Exercises</Button>
      {/* margin */}
      </Box>
      </Box>


      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Exercises</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {questions.map((q) => (
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            width: "100%",
            }
        }}
          >
          <TableCell align="center">
          {q}
           </TableCell>
        </TableRow>
        ))
      }
      
      
    </TableBody>
  </Table>
</TableContainer>

<Box  display='flex' flexDirection= {"row"}>
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{width:300, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10,marginRight:10}}
      onClick={getAnswers}
      margin="normal"
      padding="normal"
      >View Exercises Answers</Button>
      {/* margin */}
      </Box>
      </Box>


      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Exercises Answers</StyledTableCell>
      </TableRow>
    </TableHead>


    <TableBody>
      {answers.map((a) => (
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            width: "100%",
            }
        }}
          >
          <TableCell align="center">
          {a}
           </TableCell>
        </TableRow>
        ))
      }
      
    </TableBody>
  </Table>
</TableContainer>



          
                </div>
    
               

    )
}
export default CourseExercises;