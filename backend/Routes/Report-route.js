const express= require("express");
const {getAllReports,createReport, getCourseReports, deleteReports, getReporterName, getReportedCourse, updateReportType, updateReportStatus}= require ("../Controller/report-controller");

const router = express.Router();

router.get("/", getAllReports);

router.post('/addReport',createReport);

router.get('/viewCourseReports',getCourseReports);

router.get('/getReportedCourse',getReportedCourse);

router.get('/getReporterName', getReporterName);

router.get('/delete',deleteReports);

router.get('/updateType',updateReportType);

router.get('/updateStatus',updateReportStatus);

// export default router;
module.exports=router;
