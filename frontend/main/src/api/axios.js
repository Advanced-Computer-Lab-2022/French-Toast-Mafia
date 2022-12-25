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
export const getPreviewVideo = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getCoursePreviewVideos")
    return response.data
}

export const getCourseRating = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Course/calculateCourseRating?id=${id}`)
    return response.data
}

export const viewSubtitle = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Subtitle/viewSubtitle?id=${id}`)
    return response.data
}

export const viewCourseReports = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Report/viewCourseReports?id=${id}`)
    return response.data
}

export const getReporter = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Report/getReporterName?id=${id}`)
    return response.data
}

export const getAllReports = async() =>{
    const response = await axios.get(`http://localhost:5000/Report/`)
    return response.data
}

export const getReportedCourse = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Report/getReportedCourse?id=${id}`)
    return response.data
}