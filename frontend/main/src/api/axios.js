import axios from "axios"

export const getCourses = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getAllCourse")
    return response.data
}

export const viewCourse = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Course/viewCourse?id=${id}`)
    return response.data;
}

export const getAvailableSubjects = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getCourseSubjects")
    return response.data
}
export const getMaxCoursePrice = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getMaxPrice")
    return response.data
}

export const getCourseRating = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Course/calculateCourseRating?id=${id}`)
    return response.data
}