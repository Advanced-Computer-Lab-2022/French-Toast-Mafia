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


const Add1 = () => {
    
    const[Name , setName1 ] = useState('')
    const[Email , setEmail1] = useState('')
    const[Password , setPassword1] = useState('')
    const[Type , setType1] = useState('')
    const[err , setErr] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const corporateTrainees = { Name, Email , Password , Type }
        const response = await fetch('http://localhost:5000/Admin/createCorporatetrainess' , {
            method : 'POST' ,
            body : JSON.stringify(corporateTrainees) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 

        const json = await response.json(corporateTrainees)

        if(!response.ok){
            setErr(json.err)

        }
        if(response.ok){
            setName1('')
            setEmail1('')
            setPassword1('')
            setType1('')

            setErr(null)
            console.log('new corporate-trainee added', json)
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
        
        name='Name'
        value={ Name }
        onChange={(e) => setName1(e.target.value) }

        variant="outlined" margin='auto' />
        <FormLabel> Email </FormLabel>
        <TextField
        
        name='Email'
        value={ Email }
        onChange={(e) => setEmail1( e.target.value)}
         variant="outlined" margin='auto' />
        <FormLabel> Password </FormLabel>
        <TextField 
        
        name='Password'
        value={ Password }
        variant="outlined" margin='auto'
        onChange={(e) => setPassword1(e.target.value)} />
        
        <FormLabel> Type </FormLabel>
        <TextField 
        
        name='Type'
        value={ Type }
        variant="outlined" margin='auto'
        onChange={(e) => setType1(e.target.value)} />

        <Button 
        type='submit' color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}} variant="contained "> Create </Button>
    </Box>
  </form>
</Box>
}

export default Add1;

