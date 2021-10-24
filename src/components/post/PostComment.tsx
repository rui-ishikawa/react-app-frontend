import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"
import { Grid, Typography } from "@material-ui/core"

import { createComment, getComments } from "../../lib/api/comments"
import { CommentFormData } from "interfaces/index"
import { CommentData } from "interfaces/index"

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: 480
  },
  inputFileBtn: {
    marginTop: "10px"
  },
  submitBtn: {
    marginTop: "10px",
    marginLeft: "auto"
  },
  formWrapper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  textInputWrapper: {
    width: "80%"
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}))

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
}

type CommentProps = {
  content?: string
  post: any
} & RouteComponentProps<{ id: string }>

const PostComment: React.FC<CommentProps> = (props, post) => {
  const classes = useStyles()
  const id = post.id // idを取得

  const [content, setContent] = useState<string>("")
  // const [key, setKey] = useState<string>("")
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const createFormData = (): CommentFormData => {
    const formData = new FormData()

    formData.append("content", content)
    // formData.append("post_id", key)
    formData.append("userId", String(""))

    return formData
  }

  useEffect(() => {
    async function handleGetComments() {
      try {
        const res = await getComments(id)
        console.log(res)

        if (res?.status === 200) {
          // setOtherUser(res?.data.otherUser)
          setComments(res?.data.comments)
        } else {
          console.log("No comments")
        }
      } catch (err) {
        console.log(err)
      }

      setLoading(false)
    }
    handleGetComments()
  }, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await createComment(data, id)
      if (res.status === 200) {

        setComments([...comments, res.data.comment])
        // setContent("")
        // setKey("")
        console.log(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Railsから渡ってくるtimestamp（ISO8601）をdatetimeに変換
  const iso8601ToDateTime = (iso8601: string) => {
    const date = new Date(Date.parse(iso8601))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return year + "年" + month + "月" + day + "日" + hour + "時" + minute + "分"
  }

  return (
    <>
      {
        comments.map((comment: CommentData, index: number) => {
          return (
            <Grid key={index} container justifyContent="flex-start" >
              <Grid item>

                <Typography variant="body1" component="p">
                  {comment?.name}
                </Typography>
                <Typography variant="body1" component="p">
                  {comment?.content}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  color="textSecondary"
                >
                  {iso8601ToDateTime(comment.createdAt?.toString() || "100000000")}
                </Typography>
              </Grid>
            </Grid>
          )
        })
      }
      <form className={classes.formWrapper} noValidate autoComplete="off" >
        <TextField
          required
          multiline
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
          className={classes.textInputWrapper}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!content ? true : false}
          onClick={handleSubmit}
          className={classes.button}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  )
}

export default PostComment
