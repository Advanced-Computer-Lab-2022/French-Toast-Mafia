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
    const [course,setCourse] = useState([]);

    const getCourses=  async () => {
        const params = new URLSearchParams(window.location.search);
        const courseId = params.get("courseId");
        console.log(courseId);
        await axios.get(`http://localhost:5000/Course/viewCourse/${courseId}`).then(
            (res) => { 
                const resCourse = res.data
                console.log(resCourse)
                setCourse(resCourse)
                
            }
             );
             

    }

    
    return(
     
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
      </TableRow>
    </TableHead>
    <TableBody>
      {course.map((c) => (
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
          <TableCell align="center">{c.NameOfCourse}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
        

    </div>
               

    )
}
export default UserCoursePage;