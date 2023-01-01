import CourseCop from "./resultCourseCop"
import { Alert } from "reactstrap";

const CourseList = (searchResults) => {
   // console.log(Object.values(searchResults))

    const results =  Object.values(Object.values(searchResults)[0]).map(course => <CourseCop key={course._id} Course={course} />)
    const course = results?.length ? results :  <Alert color="primary">
    No matching courses found
  </Alert>
    return (
        <main>{course}</main>
    )

}

export default CourseList