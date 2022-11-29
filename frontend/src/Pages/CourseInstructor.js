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

const CourseInstructor = () => { 
    const [instructors,setInstructor] = useState([]);
    const params = new URLSearchParams(window.location.search);

    const getInstructor = async () => {
        const courseId = params.get('courseId');
        await axios.get(`http://localhost:5000/Course/viewCourseInstructor?id=${params.get('courseId')}`).then(
            (res) => {
                const resInstructor = res.data
                console.log(resInstructor)
                setInstructor(resInstructor)
            }
        );
    }

    const [ratings,setRatings] = useState([]);
    const getRatings = async () => {
      {Array.from(instructors).map((instructor) => (
         axios.get(`http://localhost:5000/Instructor/calculateInstrRating?id=${instructor.InstrId}`).then(
          (res) => {
            const resRating = res.data
            console.log(resRating)
            setRatings(resRating)
          }
        )
      ))}

    }

      
    const [rating, Setrating] = useState(null);
    const [Hover , setHover] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      console.log('heeeeeeeeeeeeeeeeeeeeeeey');
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      {Array.from(instructors).map((instructor) => (
      axios.put(`http://localhost:5000/Instructor/addInstrRating?id=${instructor.InstrId}`, { 
          id:params.get('userId'),
          rating: data.get('rating'),
      })
      ))};
      console.log({
        id:params.get('userId'),
        rating: data.get('rating'),
      });
  
  
    };


    
    return(
     
      <div className="UsersList">
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{width:300, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10}}
      onClick={getInstructor}
      margin="normal"
      padding="normal"
      >Load Instructor Info</Button>
      {/* margin */}
      </Box>


      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Instructor Name</StyledTableCell>
        <StyledTableCell align="center">Instructor Email</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {Array.from(instructors).map((instructor) => (
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            width: "100%"
            }
        }}
          >
          <TableCell align="center">{instructor.InstructorName}</TableCell>
          <TableCell align="center">{instructor.InstructorEmail}</TableCell>
        </TableRow>
      ))}
      
    </TableBody>
  </Table>
</TableContainer>



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
 Rate Instructor
</Typography>

<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              align="center"
              id="rating"
              label="rating"
              name="rating"
              autoFocus
            />
           
         
            <Box>
              <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor: '#1aac83'}}
            >
              Submit Rating
            </Button>
            </Box>
            </Box> 
            </Box>
            </Container>
            </ThemeProvider>
          
                </div>
    
               

    )
}
export default CourseInstructor;