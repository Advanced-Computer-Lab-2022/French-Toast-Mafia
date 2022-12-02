
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const { useState } = require("react");

const queryParameters = new URLSearchParams(window.location.search)
const courseId = queryParameters.get("courseId")

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
  
   if(obj[0] == "Preview"){
    if(obj[1] === "" || obj[1] === " "){
      return <TableCell>
      Null</TableCell>
    }
    else{
      return <TableCell> <a href= {obj[1]} >View Preview</a></TableCell>
   
    }
   }
   else{
    return <TableCell>
      {obj[1]}</TableCell>
   }
     
  }
    
  else{
    const nextPage = Object.values(Object.values(obj))[0];
    if(nextPage == "CourseSubtitle"){
      return <TableCell>
      <Button variant="contained"
        margin="normal"
        style={{width:175}}
        onClick={() => window.location.href=`/ViewCourse/Subtitles?courseId=${courseId}`}
        padding="normal"
        >View Subtitles</Button> 
    </TableCell>
    }
    else if(nextPage === "Promotion"){
      const prom = obj[1]
      return <TableCell>{Object.values(prom[0])[0]}%<font style={{ color: 'lightgray'}}> <font style={{ color: 'white'}}>.............</font>Ends on {Object.values(prom[0])[1]}</font></TableCell>
    } 
    else if(nextPage === "Rating"){
      return <TableCell>
      <Button variant="contained"
        style={{width:175}}
        margin="normal"
        onClick={() => window.location.href=`/ViewCourse/Rating?courseId=${courseId}`}
        padding="normal"
        >View Ratings</Button> 
    </TableCell>
    }

    else if(nextPage === "ExamCourse"){
      return <TableCell>
      <Button variant="contained"
        margin="normal"
        style={{width:175}}
        onClick={() => window.location.href=`/ViewCourse/Subtitle?courseId=${courseId}`}
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
            style={{height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={getCourse}
            margin="normal"
            padding="normal"
            >Load Course</Button>
            {/* margin */}
            <Button variant="contained"
            style={{height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={() => window.location.href=`/Instructor/EditCourse?courseId=${courseId}`}
            margin="normal"
            padding="normal"
            >Edit Course</Button>

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