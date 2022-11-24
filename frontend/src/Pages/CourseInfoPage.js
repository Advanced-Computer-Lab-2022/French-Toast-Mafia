import AllCoursesInfo from "../Components/AllCoursesInfo";
import { useEffect,useState } from "react";

const CourseInfoPage = () => {
    const [courses, setCourses] = useState(null)

    useEffect(() => {

    const fetchCourses = async () => {
      const response = await 
      fetch('http://localhost:5000/viewcoursetitlehoursrating');
      
      const data = await response.json();
      
      if(response.ok){
        setCourses(data);
      }
    }
    fetchCourses();

    
  },[]);

    return (
        <div className='courses'>
          <h1 className="App">All Courses Information</h1>
        {courses && courses.map((course) => (
            <AllCoursesInfo key={course.id} course={course} />
        ))}
       

    </div>
    );
    }

    export default CourseInfoPage;