import React, { useEffect } from 'react'
import '../style/feed.scss'
import { usePost } from '../hooks/usePost.js'
import Post from '../components/Post'
import Nav from '../../shared/components/Nav.jsx'

const Feed = () => {

  const { feed, handleGetFeed, loading } = usePost()




  useEffect(() => {
    handleGetFeed
  }, [])





  if(loading || !feed){
    return (
      <main>
        <h1> Feed is loading... </h1>
      </main>
    )
  }
  




  return (
    <main className='feed-page'>
        <Nav />
        <div className="feed">
            <div className="posts">
                {feed.map((post) => {
                  return <Post user={post.user} post={post} />
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed