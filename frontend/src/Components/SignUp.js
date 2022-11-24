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
import PropTypes from 'prop-types'


const heading =  {
  fontSize: '72 px' ,
  color : 'black',
  textAlign:'center'
}

const SignUp = () => {

    return(
        <Box>
    <h1 className='App'>Sign-Up As:</h1>
        <Box>
            <form>
            <Box 
      padding={3}
      width="80%"
      display='flex'
      margin= 'auto'
      flexDirection= {"row"}
      justifyContent= "space-evenly"
      >
        
        <Button 
        style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
        type='submit'
        LinkComponent={Link} to ="/addadmin"
        //color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} 
        variant="contained "> 
        <h1 > Admin </h1> 
        </Button>

     <Button
        style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
        type='submit'
     LinkComponent={Link} to ="/addinstr"
      //color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} 
     variant="contained ">  
    <h1  > Instructor </h1> 
      
    </Button>
   
      <Button 
        style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
        type='submit'
       LinkComponent={Link} to ="/adduser"
       variant="contained ">  
       <h1  > User </h1>
      </Button>




     {/* <Button 
      type='submit'
      LinkComponent={Link} to ="/rate"
       color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} variant="contained "> Rate  </Button> */}
    



          </Box>
            </form>
        </Box>
        </Box>

   
)}

export default SignUp;
