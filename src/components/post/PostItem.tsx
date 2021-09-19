import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import DeleteIcon from "@material-ui/icons/Delete"

import UserModal from "./UserModal"
import { Post } from "../../interfaces/index"
import { deletePost } from "../../lib/api/posts"
// import userEvent from "@testing-library/user-event"

const useStyles = makeStyles(() => ({
  card: {
    width: 480,
    marginTop: "2rem",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)"
    }
  },
  delete: {
    marginLeft: "auto"
  }
}))

interface PostItemProps {
  post: Post
  handleGetPosts: Function
}


const PostItem = ({ post, handleGetPosts }: PostItemProps) => {
  const classes = useStyles()
  const [like, setLike] = useState<boolean>(false)

  const handleDeletePost = async (id: string) => {
    await deletePost(id)
      .then(() => {
        handleGetPosts()
      })
  }

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar>
              U
            </Avatar>
          }
          title={post.name}
        />
        {post.image?.url ?
          <CardMedia
            component="img"
            src={post.image.url}
            alt="post image"
          /> : null
        }
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            {post.content?.split("\n").map((content: string, index: number) => {
              return (
                <p key={index}>{content}</p>
              )
            })
            }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => like ? setLike(false) : setLike(true)}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <UserModal />
          <div className={classes.delete}>
            <IconButton
              onClick={() => handleDeletePost(post.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </>
  )
}

export default PostItem
