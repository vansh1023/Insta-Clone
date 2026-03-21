import { createContext, useEffect } from "react"
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api.js"



export const usePost = () => {
    const context = createContext()

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }


    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }



    const handleLike = async (postId) => {
        setLoading(true)
        const data = await likePost(postId)
        setLoading(false)
    }


    const handleUnlike = async (postId) => {
        setLoading(true)
        const data = await unlikePost(postId)
        setLoading(false)
    }


    useEffect(() => {
      handleGetFeed()
    }, [])
    

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnlike }
}