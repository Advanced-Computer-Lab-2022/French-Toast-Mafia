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
import StarRating from '../Components/StarRating';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';

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

    const [videos,setVideos] = useState([]);
    const params = new URLSearchParams(window.location.search);

    const getVideos = async () => {
        await axios.get(`http://localhost:5000/Subtitle/getCourseSubtitlesVideos?id=${params.get('courseId')}`).then(
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
      style={{width:300, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10}}
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
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            width: "100%",
            }
        }}
          >
          <TableCell align="center">
            <iframe src={v} title="Youtube Video allowfullscreen"></iframe>
            </TableCell>
        </TableRow>
      ))}
      
    </TableBody>
  </Table>
</TableContainer>


{/* 
  <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5" style={{marginTop:20}}>
Course Videos
</Typography>
            </Box>
            </Container>
            </ThemeProvider> */}
          
                </div>
    
               

    )
}
export default CourseVideos;