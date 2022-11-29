import React from 'react'
import { useState, useEffect } from 'react';
import {Box, Typography } from '@mui/material'
import { FormLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import PopUp from "./PopUp"; 
import PopUpW from './PopUpW';
//import {MenuItem, Select, InputLabel} from '@mui/material';
//import { purple } from '@mui/material/colors';
//import addAdministrator from '../api-helpers/helpers'
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// export default class App extends React.Component {
//   state = {seen: false};
//   };


const Add = () => {
    
    const[InstrName , setName] = useState('')
    const[InstrEmail , setEmail] = useState('')
    const[InstrPassword , setPassword] = useState('')
    const[err , setErr] = useState(null)
    const navigate = useNavigate();

    const navigateToContract = () => {
      // 👇️ navigate to /Contract
      navigate('/PopUp');
    };
   
    // const togglePop = () => {
    //   this.setState({
    //    seen: !this.state.seen
    //   });
    //  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/InstrAdded');

        const instructor = { InstrName, InstrEmail , InstrPassword }
        const response = await fetch('http://localhost:5000/Admin/addInstructor' , {
            method : 'POST' ,
            body : JSON.stringify(instructor) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 

        const json = await response.json(instructor)

        if(!response.ok){
            setErr(json.err)

        }
        if(response.ok){
            setName('')
            setEmail('')
            setPassword('')

            setErr(null)
            console.log('new instr added', json)
        }
   }

  
  return < Box display='flex' flexDirection={"column "} width='100%' height = "100%" >
    < Box display='flex' margin='auto' padding={2} >
    
    </Box>
    <form onSubmit={ handleSubmit}>
      <Box 
      padding={3}
      width="60%"
      display='flex'
      margin= 'auto'
      flexDirection= {"column"}
      >
        <h6 className='App-text' > Create Instructor account: </h6>

        <FormLabel> Name </FormLabel>
        <TextField 
        
        name='InstrName'
        value={ InstrName}
        onChange={(e) => setName(e.target.value) }

        variant="outlined" margin='auto' />
        <FormLabel> Email </FormLabel>
        <TextField
        
        name='InstrEmail'
        value={ InstrEmail }
        onChange={(e) => setEmail( e.target.value)}
         variant="outlined" margin='auto' />
        <FormLabel> Password </FormLabel>
        <TextField 
        
        name='InstrPassword'
        value={InstrPassword}
        variant="outlined" margin='auto'
        onChange={(e) => setPassword(e.target.value)} />
        

        <Button 
        style={{width:250, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}

        type='submit'
         //color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}}
          variant="contained "> 
         <h1  > Add </h1>

         </Button>


         <Button 
         style={{width:300, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 , left:'550px' ,bottom:'50px'}}
        // onClick={togglePopup}
          variant="contained "> 
        
         <h1  > View Contract </h1>

         </Button>
    
    
    </Box>
  </form>
</Box>


}


export default Add;


