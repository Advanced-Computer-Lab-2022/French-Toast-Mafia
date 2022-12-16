const express= require("express");
const {getAllReports,createReport, deleteReports }= require ("../Controller/report-controller");

const router = express.Router();

router.get("/", getAllReports);

router.post('/addReport',createReport);

router.get('/delete',deleteReports);

// export default router;
module.exports=router;
