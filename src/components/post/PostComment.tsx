import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { styled } from '@material-ui/core/styles';
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"

import { createComment } from "../../lib/api/comments"
import { CommentFormData } from "interfaces/index"

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

type CommentProps = { content?: string }

const PostComment: React.FC<CommentProps> = (props) => {
  const classes = useStyles()

  const [content, setContent] = useState<string>("")

  const createFormData = (): CommentFormData => {
    const formData = new FormData()

    formData.append("content", content)
    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createComment(data)
      .then(() => {
        setContent("")
        console.log(data)
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
