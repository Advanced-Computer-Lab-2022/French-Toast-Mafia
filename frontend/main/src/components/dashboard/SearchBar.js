import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormText,
    CardText,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
  } from "reactstrap";

  import Slider from "../dashboard/Slider";
  import {useState} from 'react';

  let s = "";
const SearchBar = ({courses, setSearchResults}) =>{
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("NameOfCourse");
  const [priceRange, setPriceRange] = useState([]);
  
  const toggle = () => setDropdownOpen((prevState) => !prevState);
 
    const handleSubmit = (e) => e.preventDefault()

    const handleFilter = (e) => {
      setFilter(e.target.id)
    }

    const handlePriceChange = () => {
      console.log(s)
      const resultsArray = courses.filter(courses => courses[filter].toLowerCase().includes(s.toLowerCase())
      && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
     setSearchResults(resultsArray)
    }
    
    const handleSearchChange = (e) => {
        if (!e.target.value){
          s = e.target.value
          const resultsArray = courses.filter(courses => courses[filter].toLowerCase().includes(s.toLowerCase())
          && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
         setSearchResults(resultsArray)
        } 
        else{
          s = e.target.value
          const resultsArray = courses.filter(courses => courses[filter].toLowerCase().includes(s.toLowerCase())
           && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
          setSearchResults(resultsArray)
          
        }
       
    }
    return (

      
        <header>
            <Form onSubmit = {handleSubmit}>
              <FormGroup>
              <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-end'}}>
                <Input
                  id="Search"
                  placeholder="Ex. Python Crash Course"
                  onChange={handleSearchChange}
                />
                 <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle className="btn" outline color="primary">
                  <i class="bi bi-funnel"></i>&nbsp;Filter: {filter}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Filter by:</DropdownItem>
                    <DropdownItem id="NameOfCourse" onClick={handleFilter}>Course Name</DropdownItem>
                    <DropdownItem onClick={handleFilter}>Instructor Name</DropdownItem>
                    <DropdownItem id="Subject" onClick={handleFilter}>Subject</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                  {/* <Button className="btn" outline color="primary">
                  <i class="bi bi-funnel"></i>&nbsp;Filter
                </Button> */}
                </div>
                <br/>
                <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-start'}}>
                <CardText className="fw-light card-text">Price Range:&nbsp;&nbsp;&nbsp;&nbsp;</CardText>
                <Col lg="8">
                  <Slider setPriceRange={setPriceRange} handlePriceChange={handlePriceChange}/>
                  </Col>
                </div>
               
              </FormGroup>
              </Form>
        </header>
   
    )
}

export default SearchBar