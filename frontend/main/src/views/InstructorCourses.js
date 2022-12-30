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
import withStyles from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const { useState, useEffect } = require("react");


const InstructorCourses = () => { 
  const navigate = useNavigate();
  
    const params = new URLSearchParams(window.location.search);
    //const id = params.get('userId');

    const search=useLocation().search;
    const id=new URLSearchParams(search).get('instrId');
    
    console.log(id);
    const [course,setCourses] = useState([]);

    useEffect(function () {
          axios.get(`http://localhost:5000/Instructor/viewInstrCourse?id=${id}`).then(

        (res) => { 
            const course = res.data
            console.log(course)
            setCourses(course)
            
        }
         );
    }
    ,[]);
  
    return(

        <div className="UserCourses"   >
            <h1 style={{textAlign: "center"}}>My Courses</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"  style={{ color:'#FFF'}} >
        <TableHead  sx={{
              backgroundColor: "black",
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              padding: "4px",
            }} >
          <TableRow>
            <StyledTableCell align="center" >Course Title</StyledTableCell>


          </TableRow>
        </TableHead   >
        <TableBody>
          {course.map((Courses) =>(
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            
            onClick={() => 
              // window.location.href=`/UserCoursePage?courseId=${Courses.id}&userId=${params.get('userId')}`
              navigate(`/InstructorCoursePage?courseId=${Courses.id}&instrId=${id}`)
            }
              key={Courses._id}

              >
              <TableCell align="center">{Courses.Name}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}
export default InstructorCourses;

