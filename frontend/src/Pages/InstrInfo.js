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
import { useNavigate } from 'react-router-dom';
const { useState } = require("react");



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  


const InstrInfo = () => {

    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);

    const [instructor,setInstructor] = useState([]);


    const getInstructor =  async () => {
        await axios.get(`http://localhost:5000/Instructor/viewInstrInfo?id=${id}`).then(
       (res) => { 
           const instructor = res.data
           console.log(instructor)
           setInstructor(instructor)   
       }
        );
      
   

   }
   const navigateToInfo= () => {
    // 
    navigate(`/EditInfo?id=${id}`);
  };

  const navigateToBiography= () => {
    // 
    navigate(`/EditBiography?id=${id}`);
  };

   return(
   <div className="InstructorsList">
            {/* <Box sx={{marginBottom: 2}}> */}
            <Button variant="contained"
            style={{ bottom:20, left:5,width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={getInstructor}
            margin="normal"
            padding="normal"
            >Load Info </Button>
            {/* margin */}
            {/* </Box> */}

            <Button variant="contained"
            style={{ bottom:20, left:100,width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={navigateToInfo}
            margin="normal"
            padding="normal"
            > Edit My Email </Button>
            
            <Button variant="contained"
            style={{ bottom:20, left:150,width:200, height:40  ,backgroundColor:' #1aac83', color:'#FFF' ,marginTop:10 }}
            onClick={navigateToBiography}
            margin="normal"
            padding="normal"
            > Edit My Biogrpahy </Button>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table"  style={{ backgroundColor: '#FFFFFF', color:'#1aac83'}}>
        <TableHead >
          <TableRow>
            <StyledTableCell align="center"   style={{ backgroundColor: '#2D8668', color:'#FFFFFF'}} >Name</StyledTableCell>
            <StyledTableCell align="center" style={{ backgroundColor: '#2D8668', color:'#FFFFFF'}} >Email</StyledTableCell>
            <StyledTableCell align="center" style={{ backgroundColor: '#2D8668', color:'#FFFFFF'}} >Country</StyledTableCell>
            <StyledTableCell align="center" style={{ backgroundColor: '#2D8668', color:'#FFFFFF'}} >Biography</StyledTableCell>
            <StyledTableCell align="center" style={{ backgroundColor: '#2D8668', color:'#FFFFFF'}} >Review </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#1aac83",
                width: "20%"
                }
            }}

              >
              <TableCell align="center"  style ={{color:'#1aac83'}}>{instructor.Name}</TableCell>
              <TableCell align="center" style ={{color:'#1aac83'}}>{instructor.Email}</TableCell>
              <TableCell align="center" style ={{color:'#1aac83'}}>{instructor.Country}</TableCell>
              <TableCell align="center" style ={{color:'#1aac83'}}>{instructor.Biography}</TableCell>
              <TableCell align="center" style ={{color:'#1aac83'}}>{instructor.Review}</TableCell>

            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )


}
    export default InstrInfo;