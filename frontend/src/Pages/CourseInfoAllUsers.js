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

const CourseInfoAllUsers = () => { 
    const [courses,setCourses] = useState([]);
    const params = new URLSearchParams(window.location.search);
  
    const getCourses=  async () => {
        const courseId = params.get('courseId');
        await axios.get(`http://localhost:5000/Course/viewCourseDetails?id=${courseId}`).then(
            (res) => { 
                const resCourse = res.data
                console.log(resCourse)
                setCourses(resCourse)
                
            }
             );
             

    }
    const [ratings,setRatings] = useState([]);
    const getRatings = async () => {
        const courseId = params.get('courseId');
        await axios.get(`http://localhost:5000/Course/calculateCourseRating?id=${courseId}`).then(
            (res) => {
                const resRating = res.data
                console.log(resRating)
                setRatings(resRating)
            }
        );

    }
    
    return(
     
      <div className="UsersList">
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
      onClick={getCourses}
      margin="normal"
      padding="normal"
      >Load Courses Details</Button>

      <Button variant="contained"
        style={{backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 ,marginLeft:10}}
        onClick={getRatings}
        margin="normal"
        padding="normal"
        >Load Course Rating</Button>
      {/* margin */}
      </Box>



      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Subtitles</StyledTableCell>
        <StyledTableCell align="center">Course Exercises</StyledTableCell>
        <StyledTableCell align="center">Subtitles Hours</StyledTableCell>
        <StyledTableCell align="center">Total Duration</StyledTableCell>
        <StyledTableCell align="center">Price</StyledTableCell>
        <StyledTableCell align="center">Rating</StyledTableCell>
        <StyledTableCell align="center">Register</StyledTableCell>
        
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
          <TableCell align="center">{course.SubtitlesTitles}</TableCell>
          <TableCell align="center">{course.Excercises}</TableCell>
          <TableCell align="center">{course.SubtitlesHours}</TableCell>
          <TableCell align="center">{course.TotalHours}</TableCell>
          <TableCell align="center">{course.CoursePrice}</TableCell>
          <TableCell align="center">{ratings}</TableCell>
          <TableCell align="center">
          <Button variant="contained"
      style={{backgroundColor:' #1aac83', color:'#FFF' ,marginTop:5, marginBottom:5 }}
      margin="normal"
      padding="normal"
      >Register</Button>
          </TableCell>
        </TableRow>
      ))}
      
    </TableBody>
  </Table>
</TableContainer>
      

        
    </div>
               

    )
}
export default CourseInfoAllUsers;