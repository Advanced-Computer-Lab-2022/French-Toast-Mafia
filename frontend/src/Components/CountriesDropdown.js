import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CountriesDropdown = () => {
 
  
  return (
    <div>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Select your Country</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      // value={Country}
      // label="Country"
      // onChange={handleChange}
    >
      <MenuItem value={10}>Egypt</MenuItem>
      <MenuItem value={20}>United Kingdom</MenuItem>
      <MenuItem value={30}>United States</MenuItem>
      <MenuItem value={30}>Spain</MenuItem>
      <MenuItem value={30}>India</MenuItem>
    </Select>
  </FormControl>
  </div>
  )
}




export default CountriesDropdown


