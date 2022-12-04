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
const courseId = queryParameters.get("id")

const newData = {};
const Exercise = {};

const handleSubmit = async(req , res) => {
        newData["Course"] = courseId;
        // newData["Exercise"] = Exercise;
        console.log(newData)
        const response =  await fetch(`http://localhost:5000/Subtitle/addSubtitle?id=${courseId}`,{
          method: 'POST',
          body: JSON.stringify(newData),
          headers : {
              'Content-Type':'application/json'
          }
      })
      console.log(response)
      const json = await response.json();
      if (!response.ok){
        console.log(response)
    }
    if (response.ok){
        console.log("New subtitle added")
        window.location.href=`/AddSubtitle?id=${courseId}`
}

}


const handleChange = (event) => {
    const attr = event.target.id
    console.log(attr)
    console.log(event.target.value)
    // if(attr == "Question" || attr == "Answer"){
    //   Exercise[attr] = event.target.value
    // }
    // else{
      newData[attr] = event.target.value
    // }
  
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
    
    if(str === "Description"){
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
      id={"Description"}
      label="Description"
      multiline
      rows={5}
      onChange={handleChange}
      size="small"
    /> 
    </div>
  </Box>
  </TableCell>
    }
    else if(label === "Exercise"){
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
          id={"Question"}
          label="Question"
          onChange={handleChange}
          size="small"
        />  <TextField
        id={"Answer"}
        label="Answer"
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

const AddSubtitle = () => { 
   
    return(
        <div className="SubtitleAttributes">

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Title</StyledTableCell>
              {addInputField("Title")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Video</StyledTableCell>
              {addInputField("Video")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Duration</StyledTableCell>
              {addInputField("Duration")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Exercise</StyledTableCell>
              {addInputField("Exercise")}
          </TableRow>
          <TableRow  className='row-style'>
              <StyledTableCell variant="head" width="75">Description</StyledTableCell>
              {addInputField("Description")}
          </TableRow>
      </Table>
    </TableContainer>     
    <Box sx={{marginBottom: 2}}>

        <Button variant="contained"
        onClick={handleSubmit}
        margin="normal"
        padding="normal"
        >Submit</Button>

        </Box> 


        </div>
                
    )
}

export default AddSubtitle;