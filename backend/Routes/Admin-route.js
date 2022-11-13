const express= require("express");
const {getAllAdmin , createInstructor }= require ("../Controller/admin-controller");

const router = express.Router();

router.get("/", getAllAdmin);

router.post('/addInstructor',createInstructor)


// export default router;
module.exports=router;
