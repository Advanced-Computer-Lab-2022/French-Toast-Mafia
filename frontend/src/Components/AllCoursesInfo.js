import { useEffect,useState } from "react";
import ViewCoursePriceButton from "./ViewCoursePriceButton";
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


const AllCoursesInfo = ({course}) => {
  const params = new URLSearchParams(window.location.search);
    
    return (
      <div className="courses-info">
              <p><strong>Course Title: </strong> {course.NameOfCourse}</p>
                   <p><strong>Subject : </strong> {course.Subject}</p>
                   <p><strong>Duration : </strong> {course.Duration}</p>
                   <p><strong>Rating : </strong>  {course.Rating}</p>
        <Box sx={{ marginBottom: 2 }}>
          <Button
          style={{backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
          onClick={() => window.location.href = `/CourseInfoAllUsers?courseId=${course._id}`}>
            View Course Details
          </Button>
        </Box>
                {/* <ViewCoursePriceButton price={course.Cost}/> */}
                   </div>
    )
}

export default AllCoursesInfo