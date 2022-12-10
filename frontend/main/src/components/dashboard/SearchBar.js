import {
    Form,
    FormGroup,
    Input,
    Col,
    CardText,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
  } from "reactstrap";

  import Slider from "../dashboard/Slider";
  import {useState, useEffect} from 'react';
  import { getAvailableSubjects } from "../../api/axios";

let s = "";
const SearchBar = ({courses, setSearchResults}) =>{
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [filter, setFilter] = useState("NameOfCourse");
  const [priceRange, setPriceRange] = useState([0,5000]);
  const [subject, setSubject] = useState("All");
  const [avSubjects, setAvSubjects] = useState([]);


  useEffect(() => {
    getAvailableSubjects().then(json => {
      setAvSubjects(json)
    })
  }, []);
  


  const toggle = () => setDropdownOpen((prevState) => !prevState);
 
  const toggleCourse = () => setCourseDropdown((prevState) => !prevState);

    const handleSubmit = (e) => e.preventDefault()

    const handleFilter = (e) => {
      setFilter(e.target.id)
    }

    const handleSubject = (e) => {
      console.log(e.target.id)
      setSubject(e.target.id)
    }

    const handlePriceChange = () => {
      if(filter == "Instructor"){
        const resultsArray = courses.filter(courses => courses[filter][1].toLowerCase().includes(s.toLowerCase())
        && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
       setSearchResults(resultsArray)
      }
      else{
        const resultsArray = courses.filter(courses => courses[filter].toLowerCase().includes(s.toLowerCase())
        && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
       setSearchResults(resultsArray)
      }
   
    }
    
    const handleSearchChange = (e) => {
      s = e.target.value
      
        if (!e.target.value){
        
          if(filter === "Instructor"){
            const resultsArray = courses.filter(courses => courses[filter][1].toLowerCase().includes(s.toLowerCase())
            && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
           setSearchResults(resultsArray)
          }
          else{
            const resultsArray = courses.filter(courses => courses[filter].toLowerCase().includes(s.toLowerCase())
            && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
           setSearchResults(resultsArray)
          }
        
        } 
        else{
          
          if(filter === "Instructor"){
            const resultsArray = courses.filter(courses => courses[filter][1].toLowerCase().includes(s.toLowerCase())
            && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
           setSearchResults(resultsArray)
          }
          else{
          const resultsArray = courses.filter(courses => courses[filter].toLowerCase().includes(s.toLowerCase())
           && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] )
          setSearchResults(resultsArray)
          }
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
                  <DropdownToggle className="btn" outline color="primary" >
                  <i class="bi bi-search"></i>&nbsp;Search by: {filter}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Search by:</DropdownItem>
                    <DropdownItem id="NameOfCourse" onClick={handleFilter}>Course Name</DropdownItem>
                    <DropdownItem id="Instructor" onClick={handleFilter}>Instructor Name</DropdownItem>
                    <DropdownItem id="Subject" onClick={handleFilter}>Subject</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Dropdown isOpen={courseDropdown} toggle={toggleCourse}>
                  <DropdownToggle className="btn" outline color="primary">
                  <i class="bi bi-funnel"></i>&nbsp;Subject: {subject}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Select subject:</DropdownItem>
                    <DropdownItem id="All" onClick={handleSubject}>All</DropdownItem>
                    {avSubjects.map(subject =>  <DropdownItem id={subject} onClick={handleSubject}>{subject}</DropdownItem>)}
                  </DropdownMenu>
                </Dropdown>
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