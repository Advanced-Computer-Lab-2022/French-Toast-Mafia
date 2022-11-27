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

const UserCoursePage = () => { 
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    console.log(courseId);
    const [courses,setCourses] = useState([]);

    const getCourses=  async () => {
        /*
        get the blogs from the backend  
        */   
        await axios.get(`http://localhost:5000/Course/viewCourse?id=${courseId}`).then(
            (res) => { 
                const courses = res.data
                console.log(courses)
                setCourses(courses)
                
            }
             );
             

    }

    
    return(
        /* 
        1. create a button to load the blogs
        2. map over the blogs and display them
        */
        
        <div className="UserCourses">
        <Box sx={{marginBottom: 2}}>
        <Button variant="contained"
        onClick={getCourses}
        margin="normal"
        padding="normal"
        >Load Course Info</Button>
        {/* margin */}
        </Box>

        
    
    
        
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Name</StyledTableCell>
      {/*  <StyledTableCell align="center">Course Subtitles</StyledTableCell>*/}
        <StyledTableCell align="center">Course Summary</StyledTableCell>
        <StyledTableCell align="center">Course Subject</StyledTableCell>
        <StyledTableCell align="center">Course Level</StyledTableCell>
        <StyledTableCell align="center">Course Price</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {courses.map((course) => (
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
          <TableCell align="center">{course.NameOfCourse}</TableCell>
         {/*}<TableCell align="center">{course.CourseSubtitle}</TableCell>*/}
          <TableCell align="center">{course.Summary}</TableCell>
          <TableCell align="center">{course.Subject}</TableCell>
         <TableCell align="center">{course.LevelOfCourse}</TableCell>
         <TableCell align="center">{course.Cost}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
               

    )
}
export default UserCoursePage;