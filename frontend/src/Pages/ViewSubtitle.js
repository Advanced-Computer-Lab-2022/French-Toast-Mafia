
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const { useState } = require("react");

const queryParameters = new URLSearchParams(window.location.search)
const subId = queryParameters.get("subId")

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const getCellData = (obj) =>{

  if(typeof(obj[1])!="object"){
  
   if(obj[0] == "Preview"){
    if(obj[1] == "" || obj[1]  == " "){
      return <TableCell>
      Null</TableCell>
    }
    else{
      return <TableCell> <a href= {obj[1]} >View Preview</a></TableCell>
   
    }
   }
   else{
    return <TableCell>
      {obj[1]}</TableCell>
   }
     
  }
    
  else{
    const nextPage = Object.values(Object.values(obj))[0];
    if(nextPage == "Exercise"){
      return <TableCell>
      <Button variant="contained"
        margin="normal"
        // onClick={() => window.location.href=`/ViewCourse/Subtitle?courseId=${courseId}`}
        padding="normal"
        >View Exercises</Button> 
    </TableCell>
    }
    else if(nextPage === "Video"){
        const vid = obj[1]
        if(vid[0] === " " || vid[0] === ""){
            return <TableCell>
            Link: Null
             <font style={{ color: 'white'}}>.............</font>Description:  {vid[1]}
             </TableCell>
        }
        else{
            return <TableCell>
            Link: <a href= {vid[0]} >Watch Video</a> 
                 <font style={{ color: 'white'}}>.............</font>Description:  {vid[1]}
                 </TableCell>
        
          
        }
        //  console.log(Object.keys(vid[0]))

     
    }
    }
   
  }


const ViewSubtitle = () => { 
    const [subtitle,setSubtitle] = useState([]);

    const getSubtitle =  async () => {
       
       await axios.get(`http://localhost:5000/Subtitle/viewSubtitle?id=${subId}`).then(
        (res) => { 
            const resSubtitle = res.data
            setSubtitle(resSubtitle)
        }
         )
    }

    return(
        // {getCourse},
        <div className="CourseAttributes">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getSubtitle}
            margin="normal"
            padding="normal"
            >Load Subtitle</Button>
            {/* margin */}
            <Button variant="contained"
            onClick={() => window.location.href=`/editSubtitle?id=${subId}`}
            margin="normal"
            padding="normal"
            >Edit Subtitle</Button>

            </Box> 


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {Object.entries(subtitle).map((c) => (
          <TableRow  className='row-style' key={c[0]}>
              <StyledTableCell variant="head" width="75">{c[0]}</StyledTableCell>
              {getCellData(c)}
          </TableRow>
           ))}

      </Table>
    </TableContainer>
          
        </div>
                
    )
}

export default ViewSubtitle;