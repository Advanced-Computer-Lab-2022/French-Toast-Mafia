import express from "express";
const User= require( "../Controller/user-controller");


const router = express.Router();

router.get("/",getAllUser );

module.exports=router;