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

const queryParameters = new URLSearchParams(window.location.search)
const courseId = queryParameters.get("courseId")

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


const ViewCourseSubtitles = () => { 
    const [subtitles,setSubtitles] = useState([]);
    
    const getSubtitles =  async () => {
        
       await axios.get(`http://localhost:5000/Course/ViewCourseSubtitles?id=${courseId}`).then(
        (res) => { 
            const subs = res.data
            setSubtitles(subs)
        }
         );
    

    }
    return(
        // visualize authors in a table map over authors
        <div className="CourseList">
              <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getSubtitles}
            margin="normal"
            padding="normal"
            >Load Subtitles</Button>
            {/* margin */}
            <Button variant="contained"
            onClick={() => window.location.href=`/AddSubtitle?id=${courseId}`}
            margin="normal"
            padding="normal"
            >Add New Subtitle</Button>
            {/* margin */}
            </Box>
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subtitles.map((subtitle) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() => window.location.href=`/viewSubtitle?subId=${subtitle._id}`}
            key={subtitle._id}
            >
              <TableCell align="center">{subtitle.Title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}

export default ViewCourseSubtitles;