
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


