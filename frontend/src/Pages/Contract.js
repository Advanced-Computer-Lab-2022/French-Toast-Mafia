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
const Contract = () => {
const navigate = useNavigate();
const Accept = () => {
    // 👇️ navigate to /Contract
    navigate('/SignUp');
  };

  const Reject = () => {
    // 👇️ navigate to /Contract
    navigate('/');
  };



return 
<Box display='flex' flexDirection={"column "} width='100%' height = "100%" >
< Box display='flex' margin='auto' padding={2} >

</Box>
  




  </Box>


}

export default Contract;
