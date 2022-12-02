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
import Courses from '../Pages/Courses';
import withStyles from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    
    },
  }));


const { useState } = require("react");


const InstrCourses = () => { 
  const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const instructorId = params.get('instructorId');
    console.log(instructorId);
    const [Instrcourse,setInstrCourses] = useState([]);
    const [Instrrating,setInstrrating] = useState([]);
    const [Instrreview,setInstrreview]= useState([]);

    const getInstrCourses =  async () => {
         await axios.get(`http://localhost:5000/Instructor/ViewMyCourses?instructorId=${instructorId}`).then(

        (res) => { 
            const Instrcourse = res.data
            console.log(Instrcourse)
            setInstrCourses(Instrcourse)
            
        }
         );
       
    

    }
    const getInstrRating =  async () => {
      await axios.get(`http://localhost:5000/Instructor/calculateInstrRating?id=${instructorId}`).then(
     (res) => { 
         const Instrrating= res.data
         console.log(Instrrating)
         setInstrrating(Instrrating)
         
     }
      );

 }

    const getInstrReview =  async () => {
  await axios.get(`http://localhost:5000/Instructor/ViewMyReview?id=${instructorId}`).then(
 (res) => { 
     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh');
     const Instrreview= res.data
     console.log(Instrreview)
     setInstrreview(Instrreview)
     
 }
  );

}

const navigateToInstrInfo= () => {
  // 
  navigate(`/InstrInfo?id=${instructorId}`);
};
  
    return(

        <div className="InstrCourses"   >
            {/* <Box sx={{marginBottom: 2}}> */}
            <Button variant="contained"
            style={{bottom:20 , left:5 ,width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={getInstrCourses}
            margin="normal"
            padding="normal"
            >Load courses</Button>
            {/* </Box> */}

            {/* <Box sx={{marginBottom: 2}}> */}
            <Button variant="contained"
            style={{ bottom: 20, left: 100 , width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={getInstrRating}
            margin="normal"
            padding="normal"
            >View My Rating</Button>
          
            

            {/* <Box sx={{marginBottom: 2}}> */}
            <Button variant="contained"
            style={{bottom:20, left:200,width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={navigateToInstrInfo}
            margin="normal"
            padding="normal"
            >View My Info </Button>
            {/* </Box> */}
            
            
      
            
    {/* <TableContainer component={Paper}> */}
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table"  style={{ backgroundColor:'yellow', color:'#FFF'}} >
        <TableHead  sx={{
              backgroundColor: "black",
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              padding: "4px",
      
            }} >
          <TableRow>
            <StyledTableCell align="center" style={{width:"5px"}}  >Name of the courses given</StyledTableCell>


          </TableRow>
        </TableHead   >
        <TableBody>
          {Instrcourse.map((Courses) =>(
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100"
                }
            }}
            
            onClick={() => window.location.href=`/UserCoursePage?courseId=${Courses._id}&userId=${params.get('userId')}`}
              key={Courses._id}

              >
              <TableCell align="center">{Courses.NameOfCourse}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table"  style={{ backgroundColor:'yellow', color:'#FFF'}} >
        <TableHead  sx={{
              backgroundColor: "black",
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              padding: "4px",
      
            }} >
          <TableRow>
            <StyledTableCell align="center" style={{width:"5px"}}  >Rating</StyledTableCell>


          </TableRow>
        </TableHead   >
        <TableBody>
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100"
                }
            }}
              >
              <TableCell align="center">{Instrrating}</TableCell>
            </TableRow>
        </TableBody>
      </Table>

      {/* <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table"  style={{ backgroundColor:'yellow', color:'#FFF'}} >
        <TableHead  sx={{
              backgroundColor: "black",
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              padding: "4px",
      
            }} >
          <TableRow>
            <StyledTableCell align="center" style={{width:"5px"}}  > Review </StyledTableCell>


          </TableRow>
        </TableHead   >
        <TableBody>
       
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100"
                }
            }}


              >
              <TableCell align="center">{Instrreview.InstrReview}</TableCell>


            </TableRow>
        </TableBody>
      </Table> */}
      
    {/* </TableContainer> */}
          
        </div>
                

    )
}
export default InstrCourses;



