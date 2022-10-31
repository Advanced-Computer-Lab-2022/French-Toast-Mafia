import React from "react"; 
import { useState, useEffect } from 'react';
import {Box, Typography } from '@mui/material'
import { FormLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
//import {MenuItem, Select, InputLabel} from '@mui/material';
//import { purple } from '@mui/material/colors';
//import addAdministrator from '../api-helpers/helpers'
//import axios from 'axios';
// import PropTypes from ' prop-types ';
//import Button from './componentss/Button';
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";

const SignUp = () => {

    return(
        <Box>
        < Typography variant="h1" fontWeight={"bold "} fontFamily={'dancing script'} >
        Sign-Up As:
    </Typography>
        <Box>
            <form>
            <Box 
      padding={3}
      width="80%"
      display='flex'
      margin= 'auto'
      flexDirection= {"column"}
      >
        

        <Button 
        type='submit'
        LinkComponent={Link} to ="/addadmin"
        color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} variant="contained "> Admin
        </Button>

     <Button 
     type='submit'
     LinkComponent={Link} to ="/addinstr"
      color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} variant="contained "> Instructor </Button>
   
      <Button 
      type='submit'
      LinkComponent={Link} to ="/adduser"
       color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} variant="contained "> User </Button>
     
   



          </Box>
            </form>
        </Box>
        </Box>

   
)}













export default SignUp;
