import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import { RadioGroup  } from '@mui/material';
import { FormControlLabel } from '@mui/material';






const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const { useState } = require("react");


const ViewExam = () => { 
    const [title,setTitle] = useState('');
    const [description ,setDescription] =useState('');
    const [ Mcqs ,setMcq ] = useState([])


    
    const getMcqs =  async () => {
         await axios.get('http://localhost:5000/Exams/').then(
        (res) => { 
            const Mcqs = res.data
            console.log(Mcqs)
            setMcq(Mcqs)
            
        }
         );
    }
    

    const heading =  {
        fontSize: '72 px' ,
        color : 'black',
        textAlign:'center',
        
      }
    return(

        // visualize authors in a table map over authors
        <div className="UsersList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            style={{width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={getMcqs}
            margin="normal"
            padding="normal"
            >Start Your Exam</Button>
            </Box>


            <div>
            <label className='App-text'>  welcome to your exam!    </label>          
            { Mcqs.map((exams,i) => ( 
            <RadioGroup name="use-radio-group" defaultValue="first">
                <h1  className='App-text' >Subject: { exams.title}</h1>
                <h2  className='App-text' >Description: { exams.description}</h2>


                <h112> 1- { exams.mcq[i].question}</h112>
            <FormControlLabel value= "first choice" label={exams.mcq[i].choice1}  control={<Radio />} />
            <FormControlLabel value="second choice" label={exams.mcq[i].choice2} control={<Radio />} />
            <FormControlLabel value="third choice" label={exams.mcq[i].choice3} control={<Radio />} />
            <FormControlLabel value="fourth choice" label={exams.mcq[i].choice4} control={<Radio />} />

            </RadioGroup>

         )) }
          </div>  

          
          <input type="submit" value="Submit" />  
            
         </div>
  )
}
export default ViewExam;