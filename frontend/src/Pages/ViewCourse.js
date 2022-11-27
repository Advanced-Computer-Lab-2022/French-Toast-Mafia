
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { getTableCellUtilityClass, tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getFormControlUtilityClasses } from '@mui/material';

const { useState } = require("react");

const queryParameters = new URLSearchParams(window.location.search)
const courseId = queryParameters.get("courseId")
console.log(courseId)

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const getCellData = (obj) =>{

  if(typeof(obj[1])!="object"){
   
      return <TableCell>
        {obj[1]}</TableCell>
  }
    
  else{
    const nextPage = Object.values(Object.values(obj))[0];
    if(nextPage == "CourseSubtitle"){
      return <TableCell>
      <Button variant="contained"
        margin="normal"
        onClick={() => window.location.href=`/ViewCourse/Subtitle?courseId=${courseId}`}
        padding="normal"
        >View Subtitles</Button> 
    </TableCell>
    }
    else{
      return <TableCell>
      <Button variant="contained"
        margin="normal"
        onClick={() => window.location.href=`/ViewCourse/Exam?courseId=${courseId}`}
        padding="normal"
        >View Exam</Button> 
    </TableCell>
    }
   
  }

  
}


const ViewCourse = () => { 
    const [course,setCourse] = useState([]);
    const getCourse =  async () => {
       
       await axios.get(`http://localhost:5000/Course/ViewCourse?id=${courseId}`).then(
        (res) => { 
            const resCourse = res.data
            setCourse(resCourse)
        }
         )
    }

    return(
        // {getCourse},
        <div className="CourseAttributes">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getCourse}
            margin="normal"
            padding="normal"
            >Load Course</Button>
            {/* margin */}
            </Box>


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {Object.entries(course).map((c) => (
          <TableRow  className='row-style' key={c[0]}>
              <StyledTableCell variant="head" width="75">{c[0]}</StyledTableCell>
              {getCellData(c)}
          </TableRow>
           ))}

      </Table>
    </TableContainer>
          
        </div>
                
    )
}

export default ViewCourse;