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
import { useNavigate } from 'react-router-dom';






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
    const navigate = useNavigate();



    
    const getMcqs =  async () => {
         await axios.get('http://localhost:5000/Exams/getAllExams').then(
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
            style={{width:200, height:40  , color:'#FFF' ,marginTop:10 }}
            onClick={getMcqs}
            margin="normal"
            padding="normal"
            >Start Your Exam</Button>
            </Box>

           
            <ul>
            <label className='App-text' >  welcome to your exam!    </label>  
            
            { Mcqs.map((Exams,i) => {
              return(
                <div key={i}>

            <h2 className="question-text" >Subject: { Exams.title} , Description: { Exams.description}</h2>

            <RadioGroup  name="use-radio-group"  >
                           

                <div className="question-card">
                <h112   className="question-text" > 1- { Exams.mcq[i].question}</h112>
            <FormControlLabel value="first choice" label={Exams.mcq[i].choice1} control={<Radio />} />
            <FormControlLabel value="second choice" label={Exams.mcq[i].choice2} control={<Radio />} /> 
            <FormControlLabel value="third choice" label={Exams.mcq[i].choice3} control={<Radio />} />
            <FormControlLabel value="fourth choice" label={Exams.mcq[i].choice4} control={<Radio />} />
            </div>

            <h1></h1>

            <div className="question-card">

            <h112  className="question-text" > 2- { Exams.mcq[i+1].question}</h112>
            <FormControlLabel value= "1st choice" label={Exams.mcq[i+1].choice1} control={<Radio />} />
            <FormControlLabel value="2nd choice" label={Exams.mcq[i+1].choice2} control={<Radio />} />
            <FormControlLabel value="3rd choice" label={Exams.mcq[i+1].choice3} control={<Radio />} />
            <FormControlLabel value="4th choice" label={Exams.mcq[i+1].choice4} control={<Radio />} /> 
            </div>
            <Button 
            style={{display:'flex', width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 ,borderBlockColor:'#1aac83',borderTop:'#1aac83',borderBottom:'#1aac83',borderRight:'#1aac83',borderLeft:'#1aac83'}}
                
              onClick={ () => { navigate("/ExamIsDone") } } > Submit </Button>

            </RadioGroup>
            </div>

            
         ) }) }
            

          </ul>  


           
            
         </div>
  )
}
export default ViewExam;