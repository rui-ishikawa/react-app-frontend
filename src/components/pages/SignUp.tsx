import React, { useState, useContext, useCallback } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import "date-fns"

import { makeStyles, Theme } from "@material-ui/core/styles"

import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import Box from "@material-ui/core/Box"
import CancelIcon from "@material-ui/icons/Cancel"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { guestSignIn } from "lib/api/auth"
import { SignUpFormData } from "interfaces/index"
import { GuestSignInFormData } from "interfaces/index"


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 340
  },
  inputFileButton: {
    textTransform: "none",
    color: theme.palette.primary.main
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

// サインアップページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // アップロードした画像のデータを取得
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // 画像プレビューを表示
  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  // フォームデータを作成
  const createFormData = (): SignUpFormData => {
    const formData = new FormData()

    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("passwordConfirmation", passwordConfirmation)
    formData.append("image", image)

    return formData
  }

  // フォームデータを作成(ゲストサインアップ)
  const createGuestSignInFormData = (): GuestSignInFormData => {
    const formData = new FormData()

    formData.append("name", 'ゲストユーザー')
    formData.append("email", 'guest@example.com')
    formData.append("password", 'password')
    formData.append("passwordConfirmation", 'password')

    return formData
  }

  // サインアップの関数
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/home")

        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  // ゲストサインインの関数
  const handleSubmitGuestSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createGuestSignInFormData()

    try {
      const res = await guestSignIn(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/home")

        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="サインアップ" />
          <CardContent>
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
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード（確認用）"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
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
            <div style={{ textAlign: "right" }} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false} // 空欄があった場合はボタンを押せないように
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
            <div style={{ textAlign: "right" }} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submitBtn}
                onClick={handleSubmitGuestSignIn}
              >
                ゲストログイン
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>



      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      />
    </>
  )
}

export default SignUp
