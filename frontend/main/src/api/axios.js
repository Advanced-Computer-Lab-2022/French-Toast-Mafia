import axios from "axios"

// export const api = axios.create({
//     baseURL: 'https://localhost:5000'
// })

export const getCourses = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getAllCourse")
    return response.data
}

export const getAvailableSubjects = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getCourseSubjects")
    return response.data
}
export const getMaxCoursePrice = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getMaxPrice")
    return response.data
}