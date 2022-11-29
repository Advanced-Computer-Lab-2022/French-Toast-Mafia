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

const CourseRate = () => { 
    const params = new URLSearchParams(window.location.search);


    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      axios.put(`http://localhost:5000/Course/addCourseRating?id=${params.get('courseId')}`, { 
          id: params.get('userId'),
          rating: data.get('rating'),
      })
      console.log({
        id:params.get('userId'),
        rating: data.get('rating'),
      });
    };
    
    return(
     
      <div className="UsersList">


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
 Rate Course
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
export default CourseRate;