import AllCoursesInfo from "../Components/AllCoursesInfo";
import { useEffect,useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { Button } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';  
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const Courses = () => {
    const [courses, setCourses] = useState(null)

    const getCourses = async () => {
      await axios.get('http://localhost:5000/Course/getAllCourse').then(
        (res) => {
          const c = res.data
          console.log(c)
          setCourses(c)
        }
      );
    }
  

    return (
        <div className='courses'>
          <h1 className="App">All Courses Information</h1>
      <h1 className="App">
        <Button style={{backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10}}
        onClick={getCourses}> Load Courses</Button>
      </h1>      
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"  >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Course Title</StyledTableCell>
            <StyledTableCell align="center">Couse Duration</StyledTableCell>
            <StyledTableCell align="center">Course Price</StyledTableCell>
            <StyledTableCell align="center">Course Currency</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { courses?.map((c) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() => window.location.href=`/CourseInfoAllUsers?courseId=${c._id}`}
              key={c._id}

              >
              <TableCell align="center">{c.NameOfCourse}</TableCell>
              <TableCell align="center">{c.Duration}</TableCell>
              <TableCell align="center">{c.Cost}</TableCell>
              <TableCell align="center">{c.CourseCurrency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        {/* {courses && courses.map((course) => (
            <AllCoursesInfo key={course.id} course={course} />
        ))} */}

        </div>
      
        )}
  
    

    export default Courses;