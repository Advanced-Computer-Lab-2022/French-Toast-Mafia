import { color } from '@mui/system';
import React ,{useState} from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const heading =  {
  fontSize: '72 px' ,
  color : 'black',
  textAlign:'center'
}

const ExamIsDone = () => {
    const navigate = useNavigate();

  return(
    
    <div class="center">
        <h1 style={heading} > Exam is submitted successfully! </h1> 

         <box 
         padding={3}
      width="80%"
      display='flex'
      margin= 'auto'
      flexDirection= {"row"}
      justifyContent= "space-evenly" 
      spac>
        {'     '}
         <Button 

         style={{width:150, height:40  ,backgroundColor:' #1aac83' ,marginTop:10,justifyContent:'center' ,alignSelf: 'flex-start '}}
         onClick={ () => { navigate("/") } }
         type='submit'
         variant="contained "> 
         Done  
         </Button>
          {'    '}
         <Button 
         style={{width:225, height:40  ,backgroundColor:' #1aac83' ,marginTop:10,justifyContent:'center' ,alignSelf: 'flex-end '}}
         onClick={ () => { navigate("/ViewExamAnswer") } }
         type='submit'
         variant="contained "> 
         View Exam Solutions 
            
        </Button>
        </box>
    </div>


 );

};


export default ExamIsDone;