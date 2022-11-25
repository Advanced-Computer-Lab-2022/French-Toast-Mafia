import { color } from '@mui/system';
import React ,{useState} from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const heading =  {
  fontSize: '72 px' ,
  color : 'black',
  textAlign:'center'
}

const AdminAdded = () => {
    const navigate = useNavigate();

  return(
    <div class="center">
         <h1 style={heading} > Admin created successfully! </h1> 
         <Button 

         style={{width:150, height:40  ,backgroundColor:' #1aac83' ,marginTop:10,justifyContent:'center' ,alignSelf: 'flex-end '}}
         onClick={ () => { navigate("/") } }
         type='submit'
         variant="contained "  > 
         <h1  >     Done   </h1> 
            
        </Button>
    </div>

 );

};


export default AdminAdded;
