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


const MySubtitles = () => { 
  const navigate = useNavigate();
  
    const params = new URLSearchParams(window.location.search);
    //const id = params.get('userId');

    const search=useLocation().search;
    const courseId=new URLSearchParams(search).get('courseId');
    
    console.log(courseId);
    const [subtitle,setSubtitles] = useState([]);

    const getSubtitles =  async () => {
         await axios.get(`http://localhost:5000/Subtitle/viewAllCourseSubtitles?id=${courseId}`).then(

        (res) => { 
            const subtitle = res.data
            console.log(subtitle)
            setSubtitles(subtitle)
            
        }
         );
       
    

    }
  
    return(

        <div className="UserCourses"   >
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            style={{width:200, height:40 , color:'#FFF' ,marginTop:10 }}
            onClick={getSubtitles}
            margin="normal"
            padding="normal"
            >Load Chapters</Button>
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
            <StyledTableCell align="center" >Chapter Title</StyledTableCell>
            <StyledTableCell align="center" >Chapter Description</StyledTableCell>
            <StyledTableCell align="center" >Chapter Duration</StyledTableCell>
            <StyledTableCell align="center" >Chapter Video</StyledTableCell>
            <StyledTableCell align="center" >Progress</StyledTableCell>

          </TableRow>
        </TableHead   >
        <TableBody>
          {subtitle.map((Subtitles) =>(
            <TableRow>
              <TableCell align="center">{Subtitles.Title}</TableCell>
              <TableCell align="center">{Subtitles.Description}</TableCell>
              <TableCell align="center">{Subtitles.Duration}</TableCell>
              <TableCell align="center">
              <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
              style={{ width:150, height: 40, color: '#FFF', marginTop: 10 }}
              onClick={() => 
                     navigate(`/CourseVideos?courseId=${courseId}&subtitleId=${Subtitles._id}`)
              }
              margin="normal"
              padding="normal"
                >Watch Video</Button>
            </Box>
              </TableCell>
              <TableCell align="center">{Subtitles.Completed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}
export default MySubtitles;

