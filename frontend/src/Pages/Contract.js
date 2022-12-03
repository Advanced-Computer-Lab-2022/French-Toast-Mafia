import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';




const Contract= () => {

  const navigate = useNavigate();

  
const navigateToHome= () => {
   
  navigate('/Home');
};

  
const navigateToSignUp= () => {
   
  navigate('/addInstr');
};

    return (
     <>
      <div>
           Please read your contract carefully!
      </div>
      <div>
          you're here accepting your assigned percent (20%) of total profit of your posted materials,
          this percent is defined per course therefore for each course you'll be given 20% of which
          you'll decide to be placed in your wallet or the entered bank account, whatever will be choosen will 
          be recorded in your wallet status for extra security. There are some things that need to be considered
          before posting.
      </div>
          *For Videos:
      <div>
      1-Cannot contain any un useful information of any kind 
      </div>
      <div>
      2-Cannot contain any abusive words 
      </div>
      3-Cannot contain any harmful actions nor 
      <div>
      4-Cannot contain false information
      </div>
          *For Materials:
      <div>
        1-Need to be direct and staright forward for all users within website 
      </div>
        2-No unauthorized sales once user registered for course then he has access to all material related
        to this course  
      <div>
        3-Avoid copying materials from other Instructors within workplace otherwise account reported and
        closed immediately!
      </div>
        4-Materials need to be relevant and appropriate for users 
      <div>
        
      </div>
      You need to note that you cannot signUp without accepting our terms and conditions anything other than
      accepting will return to you to same page.
      <div>
        
      </div>

      <Button variant="contained" onClick={navigateToSignUp}
            style={{ bottom:-80, left:400, width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            // onClick={navigateToSignUp}
            margin="normal"
            padding="normal"
            > Accept Contract
       </Button>

       <Button variant="contained" onClick={navigateToHome}
            style={{ bottom:-80, left:500, width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            // onClick={navigateToSignUp}
            margin="normal"
            padding="normal"
            > Reject Contract
       </Button>



     </>
     

    )


}

export default Contract;