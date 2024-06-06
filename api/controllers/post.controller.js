import { Post } from "../mongoose/schemas/post.js";
import jwt from "jsonwebtoken"
import { SavedPost } from "../mongoose/schemas/savedPost.js";

export const getPosts = async (req, res) => {

    const query = req.query;
    try {

        const searchParams = {
            city: query.city || undefined,
            type: query.type || undefined,
            property: query.property || undefined,
            bedroom: parseInt(query.bedroom) || undefined,
            price: {
                $gte: parseInt(query.minPrice) || 0,
                $lte: parseInt(query.maxPrice) || 10000000,
            }
        }

        Object.keys(searchParams).forEach(key => {
            if (searchParams[key] === undefined) {
                delete searchParams[key];
            }
        });

        if (searchParams.price.$gte === 0 && searchParams.price.$lte === 10000000) {
            delete searchParams.price;
        }

        const posts = await Post.find(searchParams, { postDetail: 0 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to get Posts" })
    }
}
export const getPost = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {

        const post = await Post.findOne({ _id: id }).populate({
            path: "userId",
            select: "username avatar"
        })

        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload)=>{
                if(!err){
                    const saved = await SavedPost.findOne({
                        userId: payload.id,
                        postId: id
                    })
                    console.log(saved)
                    res.status(200).json({...post, isSaved: saved ? true : false});
                }
            });
        }else{
            res.status(200).json({...post, isSaved: false});
        }

    } catch (err) {
        res.status(500).json({ message: "Failed to fetch post" })
    }
}
export const addPost = async (req, res) => {

    const body = req.body
    const tokenUserId = req.userId;

    const newPost = new Post({
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
            ...body.postDetail
        }
    })

    console.log(newPost._id);
    try {
        await newPost.save();
        res.status(200).json({ message: "Post created Successfully", id: newPost._id });
    } catch (err) {
        res.status().json({ message: "Failed to Create Post" })
    }
}
export const updatePost = async (req, res) => {
    try {


        res.status(200).json({});
    } catch (err) {
        res.status().json({ message: "Failed to Update the Post" })
    }
}
export const deletePost = async (req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId

    console.log(id, tokenUserId)
    try {

        const post = await Post.findOne({ _id: id });

        console.log(post.userId, tokenUserId)

        if (post.userId !== tokenUserId) {
            console.log("bye")
            return res.status(403).json({ message: "Not Authorized !" })
        }
        console.log("hello")
        await Post.deleteOne({ _id: id })

        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (err) {
        res.status().json({ message: "Failed to Delete Post" })
    }
}
