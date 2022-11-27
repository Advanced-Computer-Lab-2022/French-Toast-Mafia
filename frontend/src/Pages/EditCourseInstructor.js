
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { getTableCellUtilityClass, tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getFormControlUtilityClasses } from '@mui/material';
const { useState } = require("react");


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
  if(typeof(obj[1])!="object")
    return obj[1]
  else
    return Object.keys(obj).length 
  // console.log(obj[1])
  // console.log(typeof(obj[1]))
  
}

const cellClick = (obj) =>{
  console.log("click click")
}

const EditCourse = () => { 
    const [course,setCourse] = useState([]);
    
    const getCourse =  async () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const courseId = queryParameters.get("courseId")
        console.log(courseId)
       await axios.get(`http://localhost:5000/Course/ViewCourse/${courseId}`).then(
        (res) => { 
            const resCourse = res.data
            setCourse(resCourse)
            console.log(resCourse)
        }
         );
        // console.log(Object.keys(course))
        // console.log(Object.values(course))
    

    }
    return(
        // {getCourse},
        // visualize authors in a table map over authors
        <div className="CourseList">
             <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getCourse}
            margin="normal"
            padding="normal"
            >Load Course</Button>
            {/* margin */}
            </Box>

{/* Call stuff using keys and values - nested map for the keys and values of the subtitles */}
        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {Object.entries(course).map((c) => (
          <TableRow  className='row-style' key={c[0]}>
              <StyledTableCell variant="head" >{c[0]}</StyledTableCell>
              <TableCell  hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                // width: "100%"
                }
            }}
            >
              {getCellData(c)}</TableCell>
          </TableRow>
           ))}

      {/* <TableHead>
            <TableRow>
            
              <TableCell align="center">{Object.(course)[1]}</TableCell>
              <StyledTableCell align="center">{Object.keys(course)[2]}</StyledTableCell>
              <StyledTableCell align="center">{Object.keys(course)[3]}</StyledTableCell>
              <StyledTableCell align="center">{Object.keys(course)[4]}</StyledTableCell>
              <StyledTableCell align="center">{Object.keys(course)[5]}</StyledTableCell>
              
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
            <StyledTableCell align="center">{Object.values(course)[0]}</StyledTableCell>
            </TableRow>
        </TableBody> */}
        {/* <TableBody>
        {Object.keys(course).map((c) => (
            <TableRow>
              <StyledTableCell align="center">{c}</StyledTableCell>
            </TableRow>
           ))} 
        </TableBody> */}
        
      </Table>
    </TableContainer>
          
          
        </div>
                

    )
}

export default EditCourse;