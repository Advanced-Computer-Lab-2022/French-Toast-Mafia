import axios from "axios"

// export const api = axios.create({
//     baseURL: 'https://localhost:5000'
// })

export const getCourses = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getAllCourse")
    return response.data
}


export const getCourseInstructor = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Course/viewCourseInstructor?id=${id}`)
    //console.log(response.data)
    return response.data
}