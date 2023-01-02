const express= require("express");

const router = express.Router();

const { getAllrefunds ,AcceptRefund , createRefund}= require ("../Controller/reqRefund-controller");


router.get('/AcceptRefund',AcceptRefund);

router.get('/getAllrefunds',getAllrefunds);

router.post('/createRefund',createRefund);



module.exports=router;