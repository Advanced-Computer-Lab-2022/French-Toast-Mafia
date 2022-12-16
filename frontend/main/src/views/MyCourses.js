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


const { useState } = require("react");


const MyCourses = () => { 
  const navigate = useNavigate();
  
    const params = new URLSearchParams(window.location.search);
    //const id = params.get('userId');

    const search=useLocation().search;
    const id=new URLSearchParams(search).get('userId');
    
    console.log(id);
    const [course,setCourses] = useState([]);

    const getCourses =  async () => {
         await axios.get(`http://localhost:5000/User/ViewMyCourses?id=${id}`).then(

        (res) => { 
            const course = res.data
            console.log(course)
            setCourses(course)
            
        }
         );
       
    

    }
  
    return(

        <div className="UserCourses"   >
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            style={{width:200, height:40 , color:'#FFF' ,marginTop:10 }}
            onClick={getCourses}
            margin="normal"
            padding="normal"
            >Load courses</Button>
            </Box>
            
        
        
            
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
            <StyledTableCell align="center" >Name of the registered courses</StyledTableCell>


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
              navigate(`/UserCoursePage?courseId=${Courses.id}&userId=${id}`)
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
export default MyCourses;

