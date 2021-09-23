import React, { useState } from "react"

import { styled } from '@material-ui/core/styles';
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"

import { createPost } from "../../lib/api/posts"

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

const Input = styled("input")({
  display: "none"
})

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
}

interface PostFormProps {
  handleGetPosts: Function
}

const PostComment = ({ handleGetPosts }: PostFormProps) => {
  const classes = useStyles()

  const [content, setContent] = useState<string>("")



  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("content", content)
    return formData
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createPost(data)
      .then(() => {
        setContent("")
        handleGetPosts()
      })
  }

  return (
    <>
      {/* <form className={classes.form} noValidate onSubmit={handleCreatePost}>
        <TextField
          placeholder="Let's Share!"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value)
          }}
        />
        <div className={classes.submitBtn}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!content || content.length > 140}
            className={classes.submitBtn}
          >
            コメント
          </Button>
        </div>
      </form> */}
      <form className={classes.formWrapper} noValidate autoComplete="off" onSubmit={handleCreatePost}>
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
          // onClick={handleSubmit}
          className={classes.button}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  )
}

export default PostComment
