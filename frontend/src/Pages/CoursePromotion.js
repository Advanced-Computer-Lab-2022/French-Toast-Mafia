import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const theme = createTheme();

const CoursePromotion = () => {

   const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const[Promotion , setPromotion] = useState('')
    const[StartDatePromotion , setStartDatePromotion] = useState('')
    const[EndDatePromotion , setEndDatePromotion] = useState('')
    const[err , setErr] = useState(null)
    const navigate = useNavigate();
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.put(`http://localhost:5000/Instructor/addPromotion?id=${id}`, { 
      id:params.get('id'),
      Promotion: data.get('Promotion'),
      StartDatePromotion: data.get('StartDatePromotion'),
      EndDatePromotion: data.get('EndDatePromotion'),

    })
    console.log("heeeeeeeeeeeeeee");

  };

  return (
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
    
          <Typography component="h1" variant="h5">
            Set Course Promtion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Promotion"
              label="Promotion"
              type="Promotion"
              id="Promotion"
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="StartDatePromotion"
              label="Discount start date"
              type="StartDatePromotion"
              id="StartDatePromotion"
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="EndDatePromotion"
              label="Discount end date"
              type="EndDatePromotion"
              id="EndDatePromotion"
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor: '#1aac83'}}
            >
              Set Promotion
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CoursePromotion;