import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const queryParameters = new URLSearchParams(window.location.search)
const instructorId = queryParameters.get("id")

const newData = {};
const promo = {};


const handleSubmit = async(req , res) => {
        newData["Instructor"] = instructorId

        console.log(newData)
        const response =  await fetch(`http://localhost:5000/Instructor/addCourse?id=${instructorId}`,{
          method: 'POST',
          body: JSON.stringify(newData),
          headers : {
              'Content-Type':'application/json'
          }
      })
      const json = await response.json();
      if (!response.ok){
        <alert>Could not add course</alert>
        console.log(response)
    }
    if (response.ok){
    <alert>New Course Added</alert>    }
}


const handleChange = (event) => {
  const attr = event.target.id
  console.log(attr)
  console.log(event.target.value)
  if(attr == "Amount" || attr == "End"){
    promo[attr] = event.target.value
    newData["Promotion"] = promo
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

const addInputField = (str) =>{
    const label = str
    if(str === "Promotion"){
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
          id={"Amount"}
          type = "number"
          label="Amount"
          onChange={handleChange}
          size="small"
        />  <TextField
        id={"End"}
        label="Ends on"
        type="date"
        onChange={handleChange}
        size="small"
      /> 
      </div>
    </Box>
    </TableCell>
    }
    else if(str === "Summary"){
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
      id={"Summary"}
      label="Summary"
      multiline
      rows={5}
      onChange={handleChange}
      size="small"
    /> 
    </div>
  </Box>
  </TableCell>
    }
    else if(str === "Cost"){
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
      id={"Cost"}
      label="Cost"
      type="number"
      onChange={handleChange}
      size="small"
    /> 
    </div>
  </Box>
  </TableCell>
    }
    else{
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
          label= {label}
        id={label}
        onChange={handleChange}
        // placeholder="Ex.'Python Crash Course'"
        size="small"
      />
    </div>
  </Box>
  </TableCell>
    }
    
}

const AddCourse = () => { 
   
    return(
        <div className="CourseAttributes">

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Title</StyledTableCell>
              {addInputField("NameOfCourse")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Level</StyledTableCell>
              {addInputField("LevelOfCourse")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Subject</StyledTableCell>
              {addInputField("Subject")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Promotion</StyledTableCell>
              {addInputField("Promotion")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Cost</StyledTableCell>
              {addInputField("Cost")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Preview</StyledTableCell>
              {addInputField("Preview")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Summary</StyledTableCell>
              {addInputField("Summary")}
          </TableRow>

      </Table>
    </TableContainer>     
    <Box sx={{marginBottom: 2}}>

    <Button variant="contained"
            onClick={handleSubmit}
            margin="normal"
            padding="normal"
            >Add Subtitle</Button>

            <Button variant="contained"
            onClick={handleSubmit}
            margin="normal"
            padding="normal"
            >Submit</Button>

            </Box> 


        </div>
                
    )
}

export default AddCourse;