import { useEffect,useState } from "react";
const Home = () => {
const [courses, setCourses] = useState(null)

    useEffect(() => {

    const fetchCourses = async () => {
      const response = await 
      fetch('http://localhost:5000/courselist');
      const data = await response.json();
      
      if(response.ok){
        setCourses(data);
      }
    }
    fetchCourses();

    
  },[]);

return (
<div>
          <h1>All Courses Information</h1>
        {courses && courses.map((course) => (
            <p key={course.id}> 
          <p><strong>Course Title: </strong> {course.NameOfCourse}</p>
                          <p><strong>Duration : </strong> {course.Duration}</p>
                          <p><strong>Rating : </strong>  {course.Rating}</p>
       </p>
               ))}
       
       
           </div>
       );
        }
       export default Home;