
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


const InstructorCourseList = () => { 
    const [course,setICourses] = useState([]);
    
    const getCourses =  async () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const Id = queryParameters.get("Id")
        console.log(Id)
       await axios.get(`http://localhost:5000/Instructor/ViewMyCourses/${Id}`).then(
        (res) => { 
            const courses = res.data
            // console.log(courses)
            setICourses(courses)
        }
         );
    

    }
    return(
        // visualize authors in a table map over authors
        <div className="CourseList" key = {course._id} >
              <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getCourses}
            margin="normal"
            padding="normal"
            >Load Courses</Button>
            {/* margin */}
            </Box>
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"> Course Title</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {course.map((course) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() => window.location.href=`/editCourse?courseId=${course._id}`}
            key={course._id}
            >
              <TableCell align="center">{course.NameOfCourse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}

export default InstructorCourseList;