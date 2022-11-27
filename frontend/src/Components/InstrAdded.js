import { color } from '@mui/system';
import React ,{useState} from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const heading =  {
  fontSize: '72 px' ,
  color : 'black',
  textAlign:'center'
}

const InstrAdded = () => {
    const navigate = useNavigate();

  return(
    <div class="center">
         <h1 style={heading} > Instructor created successfully! </h1> 
         <Button 

         style={{width:150, height:40  ,backgroundColor:' #1aac83' ,marginTop:10,justifyContent:'center' ,alignSelf: 'flex-end '}}
         onClick={ () => { navigate("/") } }
         type='submit'
         variant="contained "  > 
         <h1  >     Done   </h1> 
            
        </Button>

        <Button 

         style={{width:250, height:40  ,backgroundColor:' #1aac83' ,marginTop:10,justifyContent:'center' ,alignSelf: 'flex-end ', position:'relative', left:'233px' , top:'2px' }}
         onClick={ () => { navigate("/AddCourse") } }
         type='submit'
         variant="contained "  > 
         <h1  >     Add Course   </h1> 
            
        </Button>

        <Button 

        style={{width:300, height:40  ,backgroundColor:' #1aac83' ,marginTop:10,justifyContent:'center' ,alignSelf: 'flex-end ', position:'relative', left:'100px' , top:'200px' }}
        onClick={ () => { navigate("/InstrRating") } }
        type='submit'
        variant="contained "  > 
        <h1  >     View my Rating  </h1> 
   
</Button>
    </div>

 );

};


export default InstrAdded;
