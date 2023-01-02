const express= require("express");

const router = express.Router();

const { AcceptRequest }= require ("../Controller/request-controller");


router.get('/AcceptRequest',AcceptRequest);


module.exports=router;