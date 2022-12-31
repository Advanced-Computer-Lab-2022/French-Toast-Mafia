const express= require("express");
const {getAllRequests, createRequest ,getCourseRequests,  getRequesterName ,  getRequestedCourse, AcceptRequest ,getRequest,RejectRequest}= require ("../Controller/request-controller");

const router = express.Router();

router.get("/", getAllRequests);

router.post('/createRequest',createRequest);

router.get('/getCourseRequests',getCourseRequests);

router.get('/getRequesterName', getRequesterName);

router.get('/getRequestedCourse',  getRequestedCourse);

router.get('/AcceptRequest',AcceptRequest);

router.get('/RejectRequest',RejectRequest);

router.get('/getRequest',getRequest);


// export default router;
module.exports=router;