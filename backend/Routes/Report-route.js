const express= require("express");
const {getAllReports,createReport, getCourseReports, deleteReports, getReporterName }= require ("../Controller/report-controller");

const router = express.Router();

router.get("/", getAllReports);

router.post('/addReport',createReport);

router.get('/viewCourseReports',getCourseReports);

router.get('/getReporterName', getReporterName);

router.get('/delete',deleteReports);

// export default router;
module.exports=router;
