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

const { useState } = require("react");

const UserCoursePage = () => { 
    const [courses,setCourses] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
    const userId = new URLSearchParams(search).get('userId');
    const courseId = new URLSearchParams(search).get('courseId');
    const navigate = useNavigate();


    const getCourses=  async () => {
       // const courseId = params.get('courseId');
     //   const userId = params.get('userId');
   
        console.log(userId);
        await axios.get(`http://localhost:5000/Course/viewUserCourse?id=${userId}`).then(
            (res) => { 
                const resCourse = res.data
                console.log(resCourse)
                setCourses(resCourse)
                
            }
             );
             

    }

    
    return(
     
      <div className="UsersList">
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{width:200, height:40  , color:'#FFF' ,marginTop:10 }}
      onClick={getCourses}
      margin="normal"
      padding="normal"
      >Load Courses Info</Button>
      {/* margin */}
      </Box>


      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Name</StyledTableCell>
        <StyledTableCell align="center">Level</StyledTableCell>
        <StyledTableCell align="center">Subject</StyledTableCell>
        <StyledTableCell align="center">Instructor Info</StyledTableCell>
        <StyledTableCell align="center">Videos</StyledTableCell>
        <StyledTableCell align="center">Exercises</StyledTableCell>
        <StyledTableCell align="center">Rate Course</StyledTableCell>
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
          <TableCell align="center">{course.LevelOfCourse}</TableCell>
          <TableCell align="center">{course.Subject}</TableCell>
          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width: 210, height: 40, color: '#FFF', marginTop: 10 }}
              onClick={() => 
                //window.location.href=`/CourseInstructor?courseId=${courseId}&userId=${userId}`
                navigate(`/CourseInstructor?courseId=${courseId}&userId=${userId}`)
              }
              margin="normal"
              padding="normal"
            >View Instructor Info</Button>
            </Box>
          </TableCell>

          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width:150, height: 40,  color: '#FFF', marginTop: 10 }}
              onClick={() => 
                //window.location.href=`/CourseVideos?courseId=${courseId}&userId=${userId}`
                navigate(`/CourseVideos?courseId=${courseId}&userId=${userId}`)
            }
              margin="normal"
              padding="normal"
            >Watch Videos</Button>
            </Box>
          </TableCell>

          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width:150, height: 40, color: '#FFF', marginTop: 10 }}
              onClick={() =>
                // window.location.href=`/CourseExercises?courseId=${courseId}&userId=${userId}`
                navigate(`/CourseExercises?courseId=${courseId}&userId=${userId}`)
            }
              margin="normal"
              padding="normal"
            >Excercies</Button>
            </Box>
          </TableCell>

          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width:150, height: 40, color: '#FFF', marginTop: 10 }}
              onClick={() => 
                //window.location.href=`/CourseRate?courseId=${courseId}&userId=${userId}`
                navigate(`/CourseRate?courseId=${courseId}&userId=${userId}`)
              }
              margin="normal"
              padding="normal"
            >Rate Course</Button>
            </Box>
          </TableCell>
         
        </TableRow>
      ))}
      
    </TableBody>
  </Table>
</TableContainer>
      

        
    </div>
               

    )
}
export default UserCoursePage;