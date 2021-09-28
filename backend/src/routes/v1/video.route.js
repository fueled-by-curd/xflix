const express = require("express");
const videoValidation = require("../../validations/video.validation");
const videoController = require("../../controllers/video.controller");
const validate = require("../../middlewares/validate");

const router = express.Router();

router.get("/", videoController.getVideos);
router.get("/:videoId", validate(videoValidation.videoIdValidation), videoController.getVideoById);
router.post("/", videoController.insertVideo);
router.patch("/:videoId/votes",validate(videoValidation.videoIdValidation), videoController.updateVotes );
router.patch("/:videoId/views",validate(videoValidation.videoIdValidation), videoController.updateViews );



module.exports = router;
