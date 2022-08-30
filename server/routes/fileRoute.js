const { uploadFile } = require("../controllers/fileController");


const router = require("express").Router();

router.post("/uploadfile/", uploadFile);


module.exports = router;