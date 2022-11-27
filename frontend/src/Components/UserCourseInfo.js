import { useEffect,useState } from "react";
import ViewCoursePriceButton from "./ViewCoursePriceButton";


const UserCourseInfo = ({course}) => {
    
    
    return (
      <div className="course-info">
              <p><strong>Course Title: </strong> {course.user}</p>
                   <p><strong>Duration : </strong> {course.Duration}</p>
                   <p><strong>Rating : </strong>  {course.Rating}</p>
                  <ViewCoursePriceButton price={course.Cost}/>
                   </div>
    )
}

export default UserCourseInfo