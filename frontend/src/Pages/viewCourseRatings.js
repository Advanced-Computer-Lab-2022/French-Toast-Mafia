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


const ViewCourseRating = () => { 
    const [ratings,setRatings] = useState([]);
    
    const getRatings =  async () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const courseId = queryParameters.get("courseId")
       await axios.get(`http://localhost:5000/Course/ViewCourseRating?id=${courseId}`).then(
        (res) => { 
            const r = res.data
            setRatings(r)
        }
         );
    

    }
    return(
        // visualize authors in a table map over authors
        <div className="RatingsList">
              <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getRatings}
            margin="normal"
            padding="normal"
            >Load Ratings</Button>
            {/* margin */}
            </Box>
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">User</StyledTableCell>
            <StyledTableCell align="center">Rating</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratings.map((rating) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            key={rating.uId}
            >
              <TableCell align="center">{rating.uId}</TableCell>
              <TableCell align="center">{rating.rating}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}

export default ViewCourseRating;