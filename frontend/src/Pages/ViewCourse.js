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
import { getFormControlUtilityClasses } from '@mui/material';

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


const ViewCourse = () => { 
    const [course,setCourse] = useState([]);
    
    const getCourse =  async () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const courseId = queryParameters.get("cId")
        console.log(courseId)
       await axios.get(`http://localhost:5000/Course/ViewCourse/${courseId}`).then(
        (res) => { 
            const resultCourse = res.data
            setCourse(resultCourse)
            console.log(course)
           
        }
         );
    

    }
    return(
        <div className="CourseDetails" key = {course._id} >
              <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getCourse}
            margin="normal"
            padding="normal"
            >Load Course</Button>
            {/* margin */}
            </Box>
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow  key = {course._id}>
            
             <TableCell align="center">{Object.entries(course)[0]}</TableCell>
             <TableCell align="center">{Object.entries(course)[1]}</TableCell>
             <TableCell align="center">{Object.entries(course)[2]}</TableCell>
             <TableCell align="center">{Object.entries(course)[3]}</TableCell>
             <TableCell align="center">{Object.entries(course)[4]}</TableCell>
             <TableCell align="center">{Object.entries(course)[5]}</TableCell>
             {/* <TableCell align="center">{Object.entries(course)[6]}</TableCell> */}
             {/* <TableCell align="center">{Object.entries(course)[7]}</TableCell> */}

            { /* <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Instructor</StyledTableCell>
            <StyledTableCell align="center">Duration</StyledTableCell>
            <StyledTableCell align="center">Level</StyledTableCell>
            <StyledTableCell align="center">Summary</StyledTableCell>
            <StyledTableCell align="center">Subject</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(course).map((([key, val]) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            // onClick={() => window.location.href=`/filter?userId=${course._id}`}
            key = {course._id}
              >
             
  {/* <TableCell align="center">{course.Instructor}</TableCell>
              <TableCell align="center">{course.Duration}</TableCell>
              <TableCell align="center">{course.Level}</TableCell>
              <TableCell align="center">{course.Summary}</TableCell>
              <TableCell align="center">{course.Subject}</TableCell>
              <TableCell align="center">{course.Price}</TableCell> */}

            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}

export default ViewCourse;