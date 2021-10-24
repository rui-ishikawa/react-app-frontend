import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { RouteComponentProps } from 'react-router-dom'

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import PostItem from "./PostItem"
import PostForm from "./PostForm"
import OutlinedCard from "./PostCard"
import PostModal from "./PostModal"

import { getPosts } from "../../lib/api/posts"
import { Post } from "../../interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "1rem"
  }
}))

type ChatRoomProps = {} & RouteComponentProps<{ id: string }>

const PostList: React.FC<ChatRoomProps> = props => {
  const classes = useStyles()
  const [posts, setPosts] = useState<Post[]>([])

  const handleGetPosts = async () => {
    const { data } = await getPosts()

    setPosts(data.posts)
  }

  useEffect(() => {
    handleGetPosts()
  }, [])

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 800 }}
      exit={{ x: -800 }}
      transition={{ duration: 0.4 }}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <OutlinedCard />
            <PostForm
              handleGetPosts={handleGetPosts}
            />
            {posts?.map((post: Post) => {
              return (
                <PostItem
                  match={props.match}
                  history={props.history}
                  location={props.location}
                  key={post.id}
                  post={post}
                  handleGetPosts={handleGetPosts}
                />
              )
            }
            )}
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  )
}

export default PostList
