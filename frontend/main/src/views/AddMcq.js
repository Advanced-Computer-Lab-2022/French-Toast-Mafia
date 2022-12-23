import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import QuizIcon from '@mui/icons-material/Quiz';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const theme = createTheme();

const AddMcq = () => {

    const[email , setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const[password , setPassword] = useState('')
    const[err , setErr] = useState(null)
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    
  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.put('http://localhost:5000/', { 
        Email: data.get('email'),
        Password: data.get('password'),
    }).then((res) => {
      if(res.data.status === 200){
          setErrorMessage('Password Changed');
      } else {
          setErrorMessage('Cannot change password');
      }
  }).catch((err) => {
      setErrorMessage('Cannot change password');
  });

  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <QuizIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Exam
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <Typography>Question</Typography>
          <TextField margin="normal" required fullWidth id="question" name="email" autoFocus/>

          <Typography>First Choice</Typography>
          <TextField margin="normal" required fullWidth id="choice1" name="email" autoFocus/>

          <Typography>Second Choice</Typography>
          <TextField margin="normal" required fullWidth id="choice2" name="email" autoFocus/>

          <Typography>Third Choice</Typography>
          <TextField margin="normal" required fullWidth id="choice3" name="email" autoFocus/>

          <Typography>Fourth Choice</Typography>
          <TextField margin="normal" required fullWidth id="choice4" name="email" autoFocus/>

          <Typography>Correct Answer</Typography>
          <TextField margin="normal" required fullWidth id="correct" name="email" autoFocus/>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Mcq
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  );
}

export default AddMcq;