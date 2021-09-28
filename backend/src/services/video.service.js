const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 *Get All existing Videos from database
 * 
 * @returns {Promise<Video>}
 */
const getAllVideos = async () => {
   return await Video.find({});
}

const findAgeFilters = (contentLimit) =>{
    let filters = ["Anyone"];
    let age = Number(contentLimit.slice(0,-1));
    if( age >= 7) filters.push("7+");
    if(age >= 12) filters.push("12+");
    if(age >= 16) filters.push("16+");
    if(age >= 18) filters.push("18+"); 
    
    return filters;

}
const getVideosByQueries = async(queries) => {

    let chainedQuery = null;
    //Title Filter
    if(queries.title){
        //console.log(queries.title);
        //videoList = await Video.find({title: { $regex: queries.title, $options: "i" }} );
        
        chainedQuery = Video.find({title: { $regex: queries.title, $options: "i" }} );
    }

    //Genre Filter
    if(queries.genres){
        let genres = queries.genres.split(",");
        //console.log(genres);
        if(chainedQuery) chainedQuery = chainedQuery.find({genre: { $in: genres }});
        else chainedQuery = Video.find({genre: { $in: genres }} );
    
    }    

    //Age restricted ocntnent filtering
    if(queries.contentRating){
        let filters = findAgeFilters(queries.contentRating)
        //console.log(filters);
        if(chainedQuery) chainedQuery = chainedQuery.find({contentRating: { $in: filters }});
        else chainedQuery = Video.find({contentRating: { $in: filters }});
    }
    
    //sorting the output
    if( queries.sortBy == "viewCount"){
        if(chainedQuery) chainedQuery = chainedQuery.sort({viewCount: -1}).collation({locale: "en_US", numericOrdering: true});
        else chainedQuery = Video.find({}).sort({viewCount: -1}).collation({locale: "en_US", numericOrdering: true});
    }
    else if(queries.sortBy == "releaseDate"){
        let videoList = null;
        if(chainedQuery) videoList = await chainedQuery.exec();
        else videoList = await Video.find({}).exec();

        videoList = videoList.map( video => JSON.parse(JSON.stringify(video)));
        
        return videoList.sort( (vid1 , vid2 ) => {
            return new Date(vid2.releaseDate) - new Date(vid1.releaseDate);
        });
    }

    return await chainedQuery.exec();

    
}
/**
 * Get video by id
 * @param {string} id
 * @returns {Promise<Video>}
 */
const findVideoById = async (videoID ) =>{
    let vid = await Video.findOne({_id : videoID});
    //console.log(vid);
    return vid;
}

const addNewVideo = async( video) =>{

    let vid = await Video.create(video);
    //console.log(vid);
    return vid;

}

const changeViews = async (videoID) =>{
    let vid = await findVideoById(videoID);
    if( !vid) return null;
    vid.viewCount += 1;
    await vid.save();
    return vid;
}
const changeVotes = async (videoID , updatedVotes) =>{
    let vid = await findVideoById(videoID);
    if( !vid) return null;
    //console.log(vid.votes[updatedVotes.vote + "s"]);
    vid.votes[updatedVotes.vote + "s"] += (updatedVotes.change == "increase") ? 1 : -1;
    
    
    await vid.save();
    return vid;
    
}
module.exports = {getAllVideos, getVideosByQueries, findVideoById, addNewVideo, changeViews, changeVotes};

