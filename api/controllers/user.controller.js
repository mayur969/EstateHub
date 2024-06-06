import { Post } from "../mongoose/schemas/post.js";
import { SavedPost } from "../mongoose/schemas/savedPost.js";
import { User } from "../mongoose/schemas/user.js";
import bcrypt from "bcryptjs";


export const getUsers = async (req, res)=> {
    try {
        const users = await User.find();

        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({message: "Failed to get Users"});
    }
}

export const updateUser = async (req, res)=> {

    const id = req.params.id;
    const tokenId = req.userId;
    const {password, avatar, ...inputs} = req.body;

    let updatedPassword = null;
    if(id !== tokenId) return res.status(403).json({message: "Not Authorized"});
    try {
        if(password){
            updatedPassword = await bcrypt.hashSync(password, 10)
        } 

        const updatedUser = await User.updateOne({_id: id}, {
            ...inputs,
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar && {avatar})
        })

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({message: "Failed to Update User"});
    }
}
export const deleteUser = async (req, res)=> {
    console.log("deleteUser")
    try {
        const user = await User.deleteOne({_id: req.params.id})

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({message: "Failed to Delete User"});
    }
}


export const savePost = async (req, res)=> {

    const postId = req.body.postId;
    const tokenUserId = req.userId;
    console.log(req);
    try {
        const savedPost = await SavedPost.findOne({
            userId: tokenUserId,
            postId
        })
        console.log(savedPost)
        if(savedPost){
            await SavedPost.deleteOne({
                _id: savedPost._id
            })
            
            res.status(200).json({message: "Post Removed from saved list"})
        }else{
            const savedPost=  new SavedPost({
                userId: tokenUserId,
                postId,
            })
            await savedPost.save();            
            res.status(200).json({message: "Post Saved Successfully"})
        }
    } catch (err) {
        res.status(500).json({message: "Failed to Save Post"});
    }
}

export const profilePosts = async (req, res)=> {
    const tokenUserId = req.userId;
    // console.log(tokenUserId)

    try {
        
        const userPost = await Post.find({userId: tokenUserId});
        const saved = await SavedPost.find({
            userId: tokenUserId
        }).populate({
            path: "postId",
        }).select("postId -_id")
          
        const savedPost = saved.map((item) => item.postId)
        res.status(200).json({userPost, savedPost})

    } catch (err) {
        res.status(500).json({message: "Failed to get Profile Post!"})
    }
}