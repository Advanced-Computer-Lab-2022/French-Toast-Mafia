import express from "express";
const Admin= require( "../Controller/admin-controller");

const router = express.Router();

router.get("/", getAllAdmin);

// export default router;
module.exports=router;
