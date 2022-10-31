import React from 'react'
import PropTypes from 'prop-types'
import {Link,useNavigate} from 'react-router-dom';

const ViewAllCoursesButton = () => {
 const navigate=useNavigate();
  const onClick=()=>{
    navigate('/CourseInfoPage');
  }
 
  
  return (
  <div>
  <div>
   
    <button onClick={onClick}>   
      View All Courses</button>
     
   </div>
</div>
  )
}

ViewAllCoursesButton.defaultProps = {
    color: 'rgb(24,144,255)',
}

ViewAllCoursesButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,

}


export default ViewAllCoursesButton

