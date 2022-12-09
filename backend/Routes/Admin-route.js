const express= require("express");
const {getAllAdmin , createAdmin, createInstructor,createCorporateTrainess  }= require ("../Controller/admin-controller");

const router = express.Router();

router.get("/", getAllAdmin);

router.post('/createAdmin',createAdmin);
router.post('/addInstructor',createInstructor);
router.post('/createCorporateTrainess',createCorporateTrainess);


// export default router;
module.exports=router;
