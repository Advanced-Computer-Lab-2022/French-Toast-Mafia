import { useEffect,useState } from "react";
import ViewCoursePriceButton from "./ViewCoursePriceButton";


const AllCoursesInfo = ({course}) => {
    
    
    return (
      <div className="courses-info">
              <p><strong>Course Title: </strong> {course.NameOfCourse}</p>
                   <p><strong>Subject : </strong> {course.Subject}</p>
                   <p><strong>Duration : </strong> {course.Duration}</p>
                   <p><strong>Rating : </strong>  {course.Rating}</p>
                  <ViewCoursePriceButton price={course.Cost}/>
                   </div>
    )
}

export default AllCoursesInfo