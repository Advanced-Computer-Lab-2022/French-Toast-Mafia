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


const Users = () => { 
  const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    
    const getUsers =  async () => {
         await axios.get('http://localhost:5000/user/').then(
        (res) => { 
            const users = res.data
            console.log(users)
            setUsers(users)
            
        }
         );
       
    

    }
    return(

        // visualize authors in a table map over authors
        <div className="UsersList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            style={{width:200, height:40 , color:'#FFF' ,marginTop:10 }}
            onClick={getUsers}
            margin="normal"
            padding="normal"
            >Load Users</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"  style={{ color:'#FFF'}}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Password</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { users.map((user) => (
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
              navigate(`/MyCourses?userId=${user._id}`)
          }
              key={user._id}

              >
              <TableCell align="center">{user.Name}</TableCell>
              <TableCell align="center">{user.Email}</TableCell>
              <TableCell align="center">{user.Password}</TableCell>
              <TableCell align="center">{user.Type}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
                

    )
}
export default Users;