const express= require("express");

const router = express.Router();

const {getAllSubtitles} = require('../Controller/subtitle-controller');

router.get('/getAllSubtitles',getAllSubtitles);

module.exports=router;
