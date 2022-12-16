import axios from 'axios';
import * as React from 'react';
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
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const theme = createTheme();

const { useState } = require("react");

const CourseInstructor = () => { 
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate(); 
    const [instructors,setInstructor] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
    const userId = new URLSearchParams(search).get('userId');
    const courseId = new URLSearchParams(search).get('courseId');
    const [errorMessage, setErrorMessage] = useState('');

    const getInstructor = async () => {
        const courseId = params.get('courseId');
        await axios.get(`http://localhost:5000/Course/viewCourseInstructor?id=${courseId}`).then(
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
   

    const handleSubmit = async (event) => {
      setOpen(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      {Array.from(instructors).map((instructor) => (
      axios.put(`http://localhost:5000/Instructor/addInstrRating?id=${instructor.InstrId}`, { 
          id:userId,
          rating: data.get('rating'),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      }, (error) => {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
      )


      ))};

    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    
    return(
     
      <div className="UsersList">
      <Box sx={{marginBottom: 2}}>
      <Button variant="contained"
      style={{width:300, height:40 , color:'#FFF' ,marginTop:10}}
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
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit Rating
            </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {errorMessage ? errorMessage : "Instructor Rated Successfully"}
                      </Alert>
                    </Snackbar>
                  </Stack>
            </Box>
            </Box> 
            </Box>
            </Container>
            </ThemeProvider>
          
                </div>
    
               

    )
}
export default CourseInstructor;