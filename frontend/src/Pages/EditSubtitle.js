import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const { useState } = require("react");

const queryParameters = new URLSearchParams(window.location.search)
const subId = queryParameters.get("id")

const newData = {};
const vid = [];

const handleSubmit = async(req , res) => {

        console.log(newData)
        const response =  await fetch(`http://localhost:5000/Subtitle/editSubtitle?id=${subId}`,{
          method: 'POST',
          body: JSON.stringify(newData),
          headers : {
              'Content-Type':'application/json'
          }
      })
      const json = await response.json();
      if (!response.ok){
        console.log('Something wrong happened')
    }
    if (response.ok){
        console.log('Subtitle Updated');
        window.location.href=`/viewSubtitle?subId=${subId}`
    }
}

const handleEditExercise = () => {
  console.log("Pressed Edit Exercise")
}

const handleChange = (event) => {
  const attr = event.target.id
  if(attr == 0 || attr == 1){
    vid[attr] = event.target.value
    newData["Video"] = vid
  }
  else{
    newData[attr] = event.target.value
  }
}


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
    if(obj[0]=="_id" || obj[0] == "Course" || obj[0] == "createdAt" || obj[0] == "updatedAt" || obj[0] == "__v"){
      return <TableCell>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            disabled
            id={obj[0]}
            onChange={handleChange}
            defaultValue={obj[1]}
            size="small"
          />
        </div>
      </Box>
      </TableCell>
    }
      return <TableCell>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={obj[0]}
          onChange={handleChange}
          defaultValue={obj[1]}
          size="small"
        />
      </div>
    </Box>
    </TableCell>
  }

  else{
    const nextPage = Object.values(Object.values(obj))[0];
    if(nextPage == "Exercise"){
      return <TableCell>
      <Button variant="contained"
        margin="normal"
        onClick={handleEditExercise}
        padding="normal"
        >Edit Exercises</Button> 
        
    </TableCell>
    }
    else if(nextPage === "Video"){
        const vid = obj[1]
        return <TableCell>
          <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id={0}
            label="Video link"
            onChange={handleChange}
            defaultValue={vid[0]}
            size="small"
          />  <TextField
          id={1}
          label="Description"
          onChange={handleChange}
          defaultValue= {vid[1]}
          size="small"
        /> 
        </div>
      </Box>
      </TableCell>

      }
    }
  
}


const EditCourse = () => { 
    const [course,setCourse] = useState([]);
    const getCourse =  async () => {
       
       await axios.get(`http://localhost:5000/Subtitle/ViewSubtitle?id=${subId}`).then(
        (res) => { 
            const resCourse = res.data
            setCourse(resCourse)
        }
         )
    }

    return(
        <div className="CourseAttributes">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getCourse}
            margin="normal"
            padding="normal"
            >Load Data</Button>
            {/* margin */}
            <Button variant="contained"
            onClick={handleSubmit}
            margin="normal"
            padding="normal"
            >Submit</Button>

            </Box> 


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {Object.entries(course).map((c) => (
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

export default EditCourse;