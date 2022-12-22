const express= require("express");
const {getAllData , addCard  }= require ("../Controller/card-controller");

const router = express.Router();

router.get("/", getAllData);

router.post('/addCard',addCard);

// export default router;
module.exports=router;
