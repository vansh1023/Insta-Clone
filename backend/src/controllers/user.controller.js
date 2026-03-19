const followModel = require('../models/follow.model.js');
const userModel = require('../models/user.model.js');





// Follow user controller
async function followUserController (req, res) {

    const follower = req.user.id;
    const followee = req.params.id;

    if(follower === followee){
        return res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({_id: followee});

    if(!isFolloweeExists){
        return res.status(404).json({
            message: "User, you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower,
        followee
    })

    if(isAlreadyFollowing){
        res.status(200).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }


    const followRecord = await followModel.create({
        follower,
        followee
    })

    res.status(201).json({
        message: "You are now following this user",
        followRecord
    })
}




// unfollow request controller
async function unfollowUserController (req, res) {

    const follower = req.user.id;
    const followee = req.params.id;

    const isUserFollowing = await followModel.findOne({follower, followee});

    if(!isUserFollowing){
        return res.status(200).json({
            message: "You are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: "You are not following this user anymore!"
    })
}





// get pending request controller
async function getPendingRequestsController (req, res) {

    const userId = req.user.id;

    const requests = await followModel.find({
        followee: userId,
        status: "pending"
    })

    res.status(200).json({
        message: "follow requests fetched successfully",
        requests
    })
}





// accept follow request controller
async function acceptRequestController (req, res) {

    const {requestId} = req.params;  //follower
    const userId = req.user.id;  // followee

    const request = await followModel.findOne({
        follower: requestId,
        followee: userId
    })

    if(!request){
        return res.status(404).json({
            message: "request not found"
        })
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({
        message: "follow request accepted"
    })
}






// reject follow request controller
async function rejectRequestController (req, res) {

    const {requestId} = req.params;  //follower
    const userId = req.user.id;  // followee

    const request = await followModel.findOne({
        follower: requestId,
        followee: userId
    })

    if(!request){
        return res.status(404).json({
            message: "request not found"
        })
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
        message: "follow request rejected"
    })
}










module.exports = {
    followUserController,
    unfollowUserController,
    getPendingRequestsController,
    acceptRequestController,
    rejectRequestController
}