import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader =async ({request, params}) => {
    const res = await apiRequest("/post/"+params.id);
    return res.data
}

export const listPageLoader = async ({request, params}) => {
    const url = new URL(request.url);
    
    const postsPromise = apiRequest("/post"+ url.search)
    return defer({
        postsPromise
    })
    
}
export const profilePageLoader = async ({request, params}) => {
    const url = new URL(request.url);
    
    const postsPromise = apiRequest("/user/profilePosts"+ url.search)
    const chatsPromise = apiRequest("/chats")
    return defer({
        postsPromise,
        chatsPromise
    })
    
}