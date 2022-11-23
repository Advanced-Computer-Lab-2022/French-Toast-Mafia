import React from 'react'
import { useState, useEffect } from 'react';
import {Box, Typography } from '@mui/material'
import { FormLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
//import {MenuItem, Select, InputLabel} from '@mui/material';
//import { purple } from '@mui/material/colors';
//import addAdministrator from '../api-helpers/helpers'
//import axios from 'axios';




const Add2 = () => {
    
    const[AdminName , setAdminName] = useState('')
    const[AdminId , setAdminid] = useState('')
    const[err , setErr] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const admin = { AdminName , AdminId  }
        const response = await fetch('http://localhost:5000/Admin/createAdmin' , {
            method : 'POST' ,
            body : JSON.stringify(admin) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 

        const json = await response.json(admin)

        if(!response.ok){
            setErr(json.err)

        }
        if(response.ok){
            setAdminName('')
            setAdminid('')

            setErr(null)
            console.log('new admin added', json)
        }
   }







  return < Box display='flex' flexDirection={"column "} width='100%' height = "100%" >
    < Box display='flex' margin='auto' padding={2} >
    {/* < Typography variant="h1" fontWeight={"bold "} fontFamily={'dancing script'} >
        Sign-up
    </Typography> */}
    </Box>
    <form onSubmit={ handleSubmit}>
      <Box 
      padding={3}
      width="80%"
      display='flex'
      margin= 'auto'
      flexDirection= {"column"}
      >
        <FormLabel> Name </FormLabel>
        <TextField 
        
        name='AdminName'
        value={ AdminName }
        onChange={(e) => setAdminName(e.target.value) }

        variant="outlined" margin='auto' />

        <FormLabel> Password </FormLabel>
        <TextField 
        
        name='AdminId'
        value={ AdminId }
        variant="outlined" margin='auto'
        onChange={(e) => setAdminid(e.target.value)} />
        

        <Button 
        type='submit' color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} variant="contained "> Create </Button>
    </Box>
  </form>
</Box>
}

export default Add2;

