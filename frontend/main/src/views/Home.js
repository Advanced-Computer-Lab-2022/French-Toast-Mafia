import { Row, Col, Card, CardBody, CardTitle} from "reactstrap";
import { getCourses } from "../api/axios";
import {useState, useEffect} from 'react';
import SearchBar from "../components/dashboard/SearchBar";
import CourseList from "../components/dashboard/CourseList";

const Home = () => {
  const[courses,setCourses] = useState([])
  const[searchResults,setSearchResults] = useState([])

  useEffect(() => {
    getCourses().then(json => {
      setCourses(json)
      return json
    }).then(json => {
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
          <CardBody className="p-4">
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

export default Home;
