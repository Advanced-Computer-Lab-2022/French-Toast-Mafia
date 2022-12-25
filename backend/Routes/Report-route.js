const express= require("express");
const {getAllReports, getReport, createReport, getCourseReports, deleteReports, getReporterName, getReportedCourse, updateReportType, updateReportStatus, addFollowup, deleteFollowup}= require ("../Controller/report-controller");

const router = express.Router();

router.get("/", getAllReports);

router.post('/addReport',createReport);

router.get('/viewCourseReports',getCourseReports);

router.get('/getReportedCourse',getReportedCourse);

router.get('/getReporterName', getReporterName);

router.get('/delete',deleteReports);

router.get('/getReport',getReport);

router.get('/updateType',updateReportType);

router.get('/updateStatus',updateReportStatus);

router.post('/addFollowup',addFollowup);

router.get('/deleteFollowup', deleteFollowup);

// export default router;
module.exports=router;
