import React from "react"; 
import { useState, useEffect } from 'react';
import {Box, Typography } from '@mui/material'
import { FormLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";


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
        <h4 > Admin </h4> 
        </Button>

     <Button
        style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
        type='submit'
     LinkComponent={Link} to ="/addinstr"
      //color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} 
     variant="contained ">  
    <h4  > Instructor </h4> 
      
    </Button>
   
      <Button 
        style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
        type='submit'
       LinkComponent={Link} to ="/adduser"
       variant="contained ">  
       <h4  > User </h4>
      </Button>
      <Button 
        style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
        type='submit'
        LinkComponent={Link} to ="/AllUsers"
        //color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} 
        variant="contained "> 
        <h4 > temp </h4> 
        </Button>



          </Box>
            </form>
        </Box>
        </Box>

   
)}

export default SignUp;
