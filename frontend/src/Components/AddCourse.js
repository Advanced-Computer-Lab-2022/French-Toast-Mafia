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
import { useNavigate } from 'react-router-dom';



const AddCourse = () => {
    
    const[NameOfCourse , setName] = useState('')
    const[CourseSubtitle ,setSubtitle] = useState('')
    const[LevelOfCourse, setLevel] = useState('')
    const[  Subject, setSubject] = useState('')
    const[ Cost, setCost] = useState('')
    const[err , setErr] = useState(null)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {NameOfCourse,CourseSubtitle,LevelOfCourse, Subject,Cost}
        const response = await fetch('http://localhost:5000/Instructor/addCourse' , {
            method : 'POST' ,
            body : JSON.stringify(course) , 
            headers : {
                'Content-Type' : 'application/json'
            }
        }) 

        const json = await response.json(course)

        if(!response.ok){
            setErr(json.err)

        }
        if(response.ok){
            setName('')
            setSubtitle('')
            setLevel('')
            setSubject('')
            setCost('')
            setErr(null)
            console.log('new course added', json)
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
        <h6 className='App-text' > Create Course  </h6>

        <FormLabel> Course Name </FormLabel>
        <TextField 
        
        name='NameOfCourse'
        value={NameOfCourse}
        onChange={(e) => setName(e.target.value) }

        variant="outlined" margin='auto' />
        
        <FormLabel> Course Subtitle </FormLabel>
        <TextField
        
        name='CourseSubtitle'
        value={ CourseSubtitle }
        onChange={(e) => setSubtitle( e.target.value)}
         variant="outlined" margin='auto' />

        <FormLabel> Course Level </FormLabel>
        <TextField 
        
        name='LevelOfCourse'
        value={LevelOfCourse}
        variant="outlined" margin='auto'
        onChange={(e) => setLevel(e.target.value)} />

        <FormLabel> Course Subject</FormLabel>
        <TextField
        
        name='Subject'
        value={Subject }
        onChange={(e) => setSubject( e.target.value)}
         variant="outlined" margin='auto' />

        <FormLabel> Course Cost</FormLabel>
        <TextField
        
        name='Cost'
        value={ Cost}
        onChange={(e) => setCost( e.target.value)}
         variant="outlined" margin='auto' />
        

        <Button 
        onClick={ () => { navigate("/InstrAdded") } }
        style={{width:250, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}

        type='submit'
         //color="purple" sx={{ width:"50%", margin:"auto ", mt: "2", borderRadius: 7}}
          variant="contained "> 
         <h1  > Add Course </h1>

         </Button>
    </Box>
  </form>
</Box>
}

export default AddCourse;