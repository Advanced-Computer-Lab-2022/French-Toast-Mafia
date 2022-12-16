import * as React from 'react';
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
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';
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

const CourseRate = () => { 
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
     const userId = new URLSearchParams(search).get('userId');
      const courseId = new URLSearchParams(search).get('courseId');
      const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
      setOpen(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      axios.put(`http://localhost:5000/Course/addCourseRating?id=${courseId}`, { 
          id: userId,
          rating: data.get('rating'),
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      });
      console.log({  id:userId,  rating: data.get('rating'), });
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
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
              autoFocus/>
           
         
            <Box>
            <Stack spacing={2} sx={{width: '100%'}}>
              <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit Rating
            </Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {errorMessage? errorMessage : "Course Rated Successfully"}
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
export default CourseRate;