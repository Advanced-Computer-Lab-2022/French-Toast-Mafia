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

const InstructorCoursePage = () => { 
    const [courses,setCourses] = useState([]);
    const search = useLocation().search;
    const courseId = new URLSearchParams(search).get('courseId');
    const instrId =new URLSearchParams(search).get('instrId');
    const navigate = useNavigate();


    const getCourses=  async () => {
        console.log(instrId);
        await axios.get(`http://localhost:5000/Instructor/viewInstrCourse?id=${instrId}`).then(
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
        <StyledTableCell align="center">Create Exam</StyledTableCell>
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
          <TableCell align="center">{course.Name}</TableCell>
          <TableCell align="center">
          <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width: 210, height: 40, color: '#FFF', marginTop: 10 }}
              onClick={() => 
                navigate(`/CreateExam?courseId=${courseId}&instrId=${instrId}`)
              }
              margin="normal"
              padding="normal"
            >Create Exam</Button>
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
export default InstructorCoursePage;