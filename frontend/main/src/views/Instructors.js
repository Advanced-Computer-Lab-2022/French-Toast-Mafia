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
import { useNavigate } from "react-router-dom";


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


const Instructors = () => { 
  const navigate = useNavigate();
    const [instructors,setInstructors] = useState([]);
    
    const getInstructors =  async () => {
         await axios.get('http://localhost:5000/Instructor/getAllInstructors').then(
        (res) => { 
            const instructors = res.data
            console.log(instructors)
            setInstructors(instructors)
            
        }
         );
    }
    return(

        // visualize authors in a table map over authors
        <div className="UsersList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            style={{width:200, height:40 , color:'#FFF' ,marginTop:10 }}
            onClick={getInstructors}
            margin="normal"
            padding="normal"
            >Load Instructors</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"  style={{ color:'#FFF'}}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { instructors.map((instr) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() => 
              // window.location.href=`MyCourses?userId=${user._id}`
              navigate(`/InstructorCourses?instrId=${instr._id}`)
          }
              key={instr._id}

              >
              <TableCell align="center">{instr.InstrName}</TableCell>
              <TableCell align="center">{instr.InstrEmail}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}
export default Instructors;