import { Row, Col, Card, CardBody, CardTitle} from "reactstrap";
import { viewInstructorCourses } from "../api/axios";
import {useState, useEffect} from 'react';
import SearchBar from "../components/dashboard/SearchBar";
import CourseList from "../components/dashboard/CourseList";
import { useLocation } from 'react-router-dom';

const SearchInstructorCourses = () => {

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  const[courses,setCourses] = useState([])
  const[searchResults,setSearchResults] = useState([])  

  useEffect(() => {   
    viewInstructorCourses(id).then(json => {
      setCourses(json)
      setSearchResults(json)
    })
  }, []);

  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardBody className="p-4" style={{maxHeight:"200px"}}>
            <Row justify-content>
              <Col lg="8">
              <SearchBar courses={courses} setSearchResults={setSearchResults}/>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <CourseList searchResults={searchResults} />
      </Col>
    </Row>
  );
};

export default SearchInstructorCourses;
