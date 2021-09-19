import React, { useContext, useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { motion } from "framer-motion";
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import IconButton from "@material-ui/core/IconButton"
import SettingsIcon from "@material-ui/icons/Settings"

import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

import PhotoCamera from "@material-ui/icons/PhotoCamera"
import Box from "@material-ui/core/Box"
import CancelIcon from "@material-ui/icons/Cancel"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Button from "@material-ui/core/Button"

import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"

import { AuthContext } from "App"


import { signOut } from "lib/api/auth"
import { updateUser } from "lib/api/users"
import { UpdateUserFormData } from "interfaces/index"

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  card: {
    width: 480
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  box: {
    marginBottom: "1.5rem"
  },
  preview: {
    width: "100%"
  }
}))

// ホーム（マイページ）
const Home: React.FC = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)

  const classes = useStyles()
  const history = useHistory()

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(currentUser?.name)
  const [profile, setProfile] = useState<string | undefined>(currentUser?.profile)
  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")

  // アップロードした画像の情報を取得
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // 画像プレビュー
  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData()

    formData.append("name", name || "")
    formData.append("profile", profile || "")
    formData.append("image", image)

    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await updateUser(currentUser?.id, data)
      console.log(res)

      if (res.status === 200) {
        setEditFormOpen(false)
        setCurrentUser(res.data.user)

        console.log("Update user successfully!")
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
      console.log("Failed in updating user!")
    }
  }

  // サインアウト用の処理
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // Cookieから各情報を削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: 800 }}
              exit={{ x: -800 }}
              transition={{ duration: 0.4 }}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <IconButton
                        onClick={() => setEditFormOpen(true)}
                      >
                        <SettingsIcon
                          color="action"
                          fontSize="small"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Avatar
                        alt="avatar"
                        src={currentUser?.image.url}
                        className={classes.avatar}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Grid item style={{ marginTop: "1.5rem" }}>
                      <Typography variant="body1" component="p" gutterBottom>
                        {currentUser?.name}
                      </Typography>
                      <Divider style={{ marginTop: "0.5rem" }} />
                      <Typography
                        variant="body2"
                        component="p"
                        gutterBottom
                        style={{ marginTop: "0.5rem", fontWeight: "bold" }}
                      >
                        自己紹介
                      </Typography>
                      {
                        currentUser.profile ? (
                          <Typography variant="body2" component="p" color="textSecondary">
                            {currentUser.profile}
                          </Typography>
                        ) : (
                          <Typography variant="body2" component="p" color="textSecondary">
                            よろしくお願いいたします。
                          </Typography>
                        )
                      }
                      <Button
                        variant="outlined"
                        onClick={handleSignOut}
                        color="primary"
                        fullWidth
                        startIcon={<ExitToAppIcon />}
                        style={{ marginTop: "1rem" }}
                      >
                        サインアウト
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <form noValidate autoComplete="off">
                <Dialog
                  open={editFormOpen}
                  keepMounted
                  onClose={() => setEditFormOpen(false)}
                >
                  <DialogTitle style={{ textAlign: "center" }}>
                    プロフィールの変更
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="名前"
                      value={name}
                      margin="dense"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <TextField
                      placeholder="1000文字以内で書いてください。"
                      variant="outlined"
                      multiline
                      fullWidth
                      label="自己紹介"
                      rows="8"
                      value={profile}
                      margin="dense"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProfile(e.target.value)
                      }}
                    />
                    <div className={classes.imageUploadBtn}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          uploadImage(e)
                          previewImage(e)
                        }}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                    {
                      preview ? (
                        <Box
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
                        </Box>
                      ) : null
                    }
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleSubmit}
                      color="primary"
                      disabled={!name || !profile ? true : false}
                    >
                      送信
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            </motion.div>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Home
