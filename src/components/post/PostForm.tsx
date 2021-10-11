import React, { useCallback, useState } from "react"

import { styled } from '@material-ui/core/styles';
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"
import CancelIcon from "@material-ui/icons/Cancel"

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
  box: {
    margin: "2rem 0 4rem",
    width: 320
  },
  preview: {
    width: "100%"
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

const PostForm = ({ handleGetPosts }: PostFormProps) => {
  const classes = useStyles()

  const [content, setContent] = useState<string>("")
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>("")

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // プレビュー機能
  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("content", content)
    if (image) formData.append("image", image)

    return formData
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createPost(data)
      .then(() => {
        setContent("")
        setPreview("")
        setImage(undefined)
        handleGetPosts()
      })
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleCreatePost}>
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
        <div className={classes.inputFileBtn}>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        <div className={classes.submitBtn}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!content || content.length > 140}
            className={classes.submitBtn}
          >
            Post
          </Button>
        </div>
      </form>
      {preview ?
        <Box
          sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}
          className={classes.box}
        >
          <IconButton
            color="inherit"
            onClick={() => setPreview("")}
          >
            <CancelIcon />
          </IconButton>
          <img
            src={preview}
            alt="preview img"
            className={classes.preview}
          />
        </Box> : null
      }
    </>
  )
}

export default PostForm
