import axios from "axios"

export const getCourses = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getAllCourse")
    return response.data
}

export const getPublishedCourses = async() =>{
    const response = await axios.get("http://localhost:5000/Course/getPublishedCourses")
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

export const getReport = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Report/getReport?id=${id}`)
    return response.data
}

export const getInstructor = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Instructor/viewInstrInfo?instrId=${id}`)
    return response.data
}

export const getAllRequests = async() =>{
    const response = await axios.get(`http://localhost:5000/Request/`)
    return response.data
}
export const getRequester = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Request/getRequesterName?id=${id}`)
    return response.data
}
export const getRequestedCourse = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Request/getRequestedCourse?id=${id}`)
    return response.data
}

export const getRequest = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Request/getRequest?id=${id}`)
    return response.data
}

export const viewCourseRequests = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Request/getCourseRequests?id=${id}`)
    return response.data
}

export const viewInstructorCourses = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Instructor/ViewMyCourses?id=${id}`)
    return response.data
}

export const deleteCourse = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Course/deleteCourse?id=${id}`)
    return response.data
}

export const publishCourse = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Course/publishCourse?id=${id}`)
    return response.data
}

export const getUser = async(id) =>{
    const response = await axios.get(`http://localhost:5000/User/getUser?id=${id}`)
    return response.data
}


export const getExercise = async(id) =>{
    const response = await axios.get(`http://localhost:5000/Exams/getExam?id=${id}`)
    return response.data
}

export const getGrade = async (uId, eId) => {
   
    const response = axios.get(`http://localhost:5000/User/getUserGrades?id=${uId}&examId=${eId}`)
    return response.data
}
    



