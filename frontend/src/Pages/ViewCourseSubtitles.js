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

const queryParameters = new URLSearchParams(window.location.search)
const courseId = queryParameters.get("courseId")
console.log(courseId)


const preview = (p) => {
    if(p == " "){
        return "Null"
    }
    else{
        return <a href= {p} >View Preview</a>
    }
}


const SubtitleList = () => { 
    const [subtitles,setSubtitles] = useState([]);
    
    const getSubs =  async () => {
         await axios.get(`http://localhost:5000/Course/viewCourseSubtitle?id=${courseId}`).then(
        (res) => { 
            const subs = res.data
            console.log(subs)
            setSubtitles(subs)
            
        }
         );
    

    }
    return(

        // visualize authors in a table map over authors
        <div className="Subtitles">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getSubs}
            margin="normal"
            padding="normal"
            >Load Subtitles</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Exercise</StyledTableCell>
            <StyledTableCell align="center">Duration</StyledTableCell>
            <StyledTableCell align="center">Preview</StyledTableCell>

            
          </TableRow>
        </TableHead>
        <TableBody >
          {subtitles.map((s) => (
            <TableRow  hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }} key={s[0]}>
              <TableCell align="center" onClick={()=> console.log("clicky clicky")}>{s.Title}</TableCell>
              <TableCell align="center">{s.Exercises}</TableCell>
              <TableCell align="center">{s.Duration}</TableCell>
              <TableCell align="center">{preview(s.Preview)}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}
export default SubtitleList;