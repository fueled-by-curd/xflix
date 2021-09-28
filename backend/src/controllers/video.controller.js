const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

const getVideos = catchAsync(async (req, res) => {
    const reqQuery = req.query;
    if( Object.keys(reqQuery).length ){
      //console.log("VIDEO REQ WITH QUERY STRING", reqQuery);
      await videoService.getVideosByQueries(reqQuery).then((value) => {
        //res.videos = value;
        res.status(200).send({videos:value});
      });
    }
    else{
        await videoService.getAllVideos().then((value) =>{
          //console.log(value.length);
          res.status(200).send({videos:value});
      });
    }
    
});

const getVideoById = catchAsync(async (req,res) =>{

    await videoService.findVideoById(req.params.videoId).then((video) =>{
        if(video) res.status(200).send(video);
        else {
          //res.videos = value;
          res.status(404).send("No video found with matching id");
        }
    });

})

const insertVideo = catchAsync(async (req,res) =>{

  await videoService.addNewVideo(req.body).then((video) =>{
    //console.log(video);
      if(video) res.status(201).send(video);
      else {
        //res.videos = value;
        res.status(404).send("Failed to add new video");
      }
  });

});

const updateViews = catchAsync(async (req,res) => {

  await videoService.changeViews(req.params.videoId).then( (video) =>{
    if(video){
      res.status(204).send();
    }
    else res.status(404).send("No video found with matching id");
  });

});

const updateVotes = catchAsync(async (req,res) => {
  await videoService.changeVotes(req.params.videoId, req.body).then( (video) =>{
    if(video){
      res.status(204).send();
    }
    else res.status(404).send("No video found with matching id");
  });

});

module.exports = {
    getVideos,getVideoById,insertVideo, updateVotes,updateViews
  };
  