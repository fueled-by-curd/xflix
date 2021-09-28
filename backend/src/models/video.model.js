const mongoose = require("mongoose");
const config = require("../config/config");

const videoSchema = mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
      trim: true,
      validate(link){
        //let linkSplit = link.split("/");
        //if(linkSplit.length != 3) throw new Error("Invalid video link. Use the format youtube.com/embed/<youtube-video-id>");
        //if(linkSplit[0] != "youtube.com" || linkSplit[1] != "embed" || !linkSplit[2].length ) throw new Error("Invalid video link. Use the format youtube.com/embed/<youtube-video-id>");
          
      }
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            let genres = ["Education", "Sports", "Movies", "Comedy", "Lifestyle" ];
            let gen = genres.reduce( (acc, val) => acc = acc || (val ==  value), false );
            if(!gen)  throw new Error("Invalid Genre. Allowed Genres are ", genres);

        }
    },
    contentRating: {
      type:String,
      required: true,
      trim: true,
      validate(value){
        let ratings = ["7+", "12+", "16+", "18+"];
        let rating = ratings.reduce( (acc, val) => acc = acc || (val ==  value), false );
        if(!rating)  throw new Error("Invalid Content Rating. Allowed Ratings are ", genres);
      },
    },
    releaseDate: {
        type: String,
        required: true,
        trim: true,
    },
    previewImage: {
        type: String,
        required: true,
        trim: true,
    },
    viewCount: {
      type: Number,
      required: false,
      default: 0
    }, 
    votes: {
      upVotes:{type:Number,default:0},
      downVotes:{type:Number,default:0},
    },   
       
});


/**
 * @typedef Video
 */
module.exports.Video = mongoose.model("Video", videoSchema);
