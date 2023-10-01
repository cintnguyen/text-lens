const express = require("express");
const router = express.Router();
const apiController = require("./apiController.js");
const upload = require("./multer.js");


router.get("/ocrtest.html", apiController.ocrTest)
router.post("/ocr", upload.single("ocrImageFile"), apiController.postOcr);


router.post("/aisummary", apiController.postAiSummary);

router.post("/translation", apiController.postTranslation);

router.post("/speech", apiController.postSpeech);


module.exports = router;