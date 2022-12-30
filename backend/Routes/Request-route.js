const express= require("express");
const {getAllRequests, createRequest ,getCourseRequests,  getRequesterName ,  getRequestedCourse, updateRequestStatus ,getRequest}= require ("../Controller/request-controller");

const router = express.Router();

router.get("/", getAllRequests);

router.post('/createRequest',createRequest);

router.get('/getCourseRequests',getCourseRequests);

router.get('/getRequesterName', getRequesterName);

router.get('/getRequestedCourse',  getRequestedCourse);

router.get('/updateRequestStatus',updateRequestStatus);

router.get('/getRequest',getRequest);


// export default router;
module.exports=router;