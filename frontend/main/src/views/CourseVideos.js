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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const theme = createTheme();

const { useState } = require("react");

const CourseVideos = () => { 
    const navigate = useNavigate();
    const [videos,setVideos] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
  //const userId = new URLSearchParams(search).get('userId');
    const courseId = new URLSearchParams(search).get('courseId');

    const getVideos = async () => {
        await axios.get(`http://localhost:5000/Subtitle/getCourseSubtitlesVideos?id=${courseId}`).then(
            (res) => {
                const resVideos = res.data
                console.log(resVideos)
                setVideos(resVideos)
            }
        );
    }

    
    return(
     
      <div className="UsersList">
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{width:300, height:40  , color:'#FFF' ,marginTop:10}}
      onClick={getVideos}
      margin="normal"
      padding="normal"
      >Load Course Videos</Button>
      {/* margin */}
      </Box>

      <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
       <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Videos</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {videos.map((v) => (
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",backgroundColor: "#f5f5f5", width: "100%", }}}>
          <TableCell align="center">
            <iframe src={v} title="Youtube Video allowfullscreen"></iframe>
            </TableCell>
        </TableRow>
      ))}
      
    </TableBody>
  </Table>
</TableContainer>

          
                </div>
    
               

    )
}
export default CourseVideos;