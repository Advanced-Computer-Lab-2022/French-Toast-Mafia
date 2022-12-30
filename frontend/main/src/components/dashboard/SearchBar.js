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
  import Rating from "./rating";

let search = "";

const SearchBar = ({courses, setSearchResults}) =>{
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [filter, setFilter] = useState("NameOfCourse");
  const [priceRange, setPriceRange] = useState([0,5000]);
  const [subject, setSubject] = useState("All");
  const [avSubjects, setAvSubjects] = useState([]);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    getAvailableSubjects().then(json => {
      setAvSubjects(json)
      setSubject("All")
    })
  }, []);
  
  useEffect(() => {
        if(subject !== "All"){
          if(rating != "All"){
            const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
          courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject && courses.avgRating >= rating)
          setSearchResults(resultsArray)
          }
          else{
            const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
            courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject)
            setSearchResults(resultsArray)
          }
         
        }
        else{
          if(rating != "All"){
            const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
          courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.avgRating >= rating)
          setSearchResults(resultsArray)
          }
          else{
            const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
            courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1])
            setSearchResults(resultsArray)
          }

        }
       
  }, [subject]);
  
  useEffect(() => {
    if(subject !== "All"){
      if(rating != "All"){
        const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
      courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject && courses.avgRating >= rating)
      setSearchResults(resultsArray)
      }
      else{
        const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
        courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject)
        setSearchResults(resultsArray)
      }
     
    }
    else{
      if(rating != "All"){
        const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
      courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.avgRating >= rating)
      setSearchResults(resultsArray)
      }
      else{
        const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
        courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1])
        setSearchResults(resultsArray)
      }

    }
  }, [rating]);


  const toggle = () => setDropdownOpen((prevState) => !prevState);
 
  const toggleCourse = () => setCourseDropdown((prevState) => !prevState);

    
    const handleFilter = (e) => {
      setFilter(e.target.id)
    }

    const handleSubject = (e) => {
    setSubject(e.target.id)
    }

  
    const handlePriceChange = () => {
      if(subject !== "All"){
        if(rating != "All"){
          const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
        courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject && courses.avgRating >= rating)
        setSearchResults(resultsArray)
        }
        else{
          const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
          courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject)
          setSearchResults(resultsArray)
        }
       
      }
      else{
        if(rating != "All"){
          const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
        courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.avgRating >= rating)
        setSearchResults(resultsArray)
        }
        else{
          const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
          courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1])
          setSearchResults(resultsArray)
        }

      }
    }
    
    const handleSearchChange = (e) => {
      search = e.target.value
        if (!e.target.value){
        
          if(subject !== "All"){
            if(rating != "All"){
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
            courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject && courses.avgRating >= rating)
            setSearchResults(resultsArray)
            }
            else{
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
              courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject)
              setSearchResults(resultsArray)
            }
           
          }
          else{
            if(rating != "All"){
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
            courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.avgRating >= rating)
            setSearchResults(resultsArray)
            }
            else{
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
              courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1])
              setSearchResults(resultsArray)
            }
  
          }
        } 
        else{
          
          if(subject !== "All"){
            if(rating != "All"){
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
            courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject && courses.avgRating >= rating)
            setSearchResults(resultsArray)
            }
            else{
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
              courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.Subject === subject)
              setSearchResults(resultsArray)
            }
           
          }
          else{
            if(rating != "All"){
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
            courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1] && courses.avgRating >= rating)
            setSearchResults(resultsArray)
            }
            else{
              const resultsArray = courses.filter(courses => (courses.Instructor[1].toLowerCase().includes(search.toLowerCase()) ||
              courses.NameOfCourse.toLowerCase().includes(search.toLowerCase()) || courses.Summary.toLowerCase().includes(search.toLowerCase()) || courses.Subject.toLowerCase().includes(search.toLowerCase())) && courses.Cost >= priceRange[0] && courses.Cost <= priceRange[1])
              setSearchResults(resultsArray)
            }
  
          }
        }
       
    }
    return (
      
        <header>
              <FormGroup>
                <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-end'}}>
                    <Input
                      id="Search"
                      placeholder="Ex. Python Crash Course"
                      onChange={handleSearchChange}
                    />
               &nbsp;
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
                <Col lg="10">
                  <Slider setPriceRange={setPriceRange} handlePriceChange={handlePriceChange}/>
                  </Col>
                </div>
                <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-start'}}>
                <CardText className="fw-light card-text">Rating:&nbsp;&nbsp;&nbsp;&nbsp;</CardText>
                  <Rating setRating={setRating}/>
                </div>
                </FormGroup>
        </header>
   
    )
}

export default SearchBar