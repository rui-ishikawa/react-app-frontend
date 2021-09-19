import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion";

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"


import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { LikeFormData } from "interfaces/index"
import AlertMessage from "components/utils/AlertMessage"

import { getUsers } from "lib/api/users"
import { getLikes, createLike } from "lib/api/likes"
import { User, LikeData } from "interfaces/index"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
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

// ユーザー一覧ページ
const Users: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()

  const initialUserState: User = {
    id: 0,
    uid: "",
    provider: "",
    email: "",
    name: "",
    image: {
      url: ""
    },
    profile: "",
    allowPasswordChange: true
  }

  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User>(initialUserState)
  const [userDetailOpen, setUserDetailOpen] = useState<boolean>(false)
  const [likedUsers, setLikedUsers] = useState<User[]>([])
  const [likes, setLikes] = useState<LikeData[]>([])
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // フォームデータを作成
  const createFormData = (): LikeFormData => {
    const formData = new FormData()

    formData.append("fromUserId", String(currentUser?.id))
    formData.append("toUserId", String(user.id))

    return formData
  }

  // いいね作成
  const handleCreateLike = async (user: User) => {

    const data = createFormData()

    try {
      const res = await createLike(data)
      console.log(res)

      if (res?.status === 200) {
        setLikes([res.data.like, ...likes])
        setLikedUsers([user, ...likedUsers])

        console.log(res?.data.like)
      } else {
        console.log("Failed")
      }

      if (res?.data.isMatched === true) {
        setAlertMessageOpen(true)
        setUserDetailOpen(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // ユーザー一覧を取得
  const handleGetUsers = async () => {
    try {
      const res = await getUsers()
      console.log(res)

      if (res?.status === 200) {
        setUsers(res?.data.users)
      } else {
        console.log("No users")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  // いいね一覧を取得
  const handleGetLikes = async () => {
    try {
      const res = await getLikes()
      console.log(res)

      if (res?.status === 200) {
        setLikedUsers(res?.data.activeLikes)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetUsers()
    handleGetLikes()
  }, [])

  // すでにいいねを押されているユーザーかどうかの判定
  const isLikedUser = (userId: number | undefined): boolean => {
    return likedUsers?.some((likedUser: User) => likedUser.id === userId)
  }

  return (
    <>
      {
        !loading ? (
          users?.length > 0 ? (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: 800 }}
              exit={{ x: -800 }}
              transition={{ duration: 0.4 }}>
              {
                users?.map((user: User, index: number) => {
                  return (
                    <div key={index} onClick={() => {
                      setUser(user)
                      setUserDetailOpen(true)
                    }}>
                      <Card className={classes.card}>
                        <CardHeader
                          avatar={
                            <Avatar
                              alt="avatar"
                              src={user?.image.url}
                              className={classes.avatar}
                            />
                          }
                          titleTypographyProps={{ variant: 'h5' }}
                          title={user.name}
                        />
                        <CardContent>
                          <Typography
                            variant="body1"
                            component="p"
                            gutterBottom
                            style={{ textAlign: "start" }}
                          >
                            {user.profile}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })
              }
            </motion.div>
          ) : (
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
            >
              まだ1人もユーザーがいません。
            </Typography>
          )
        ) : (
          <></>
        )
      }
      <Dialog
        open={userDetailOpen}
        keepMounted
        onClose={() => setUserDetailOpen(false)}
      >
        <DialogContent>
          <Grid container justifyContent="center">
            <Grid item>
              <Avatar
                alt="avatar"
                src={user?.image.url}
                className={classes.avatar}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item style={{ marginTop: "1rem" }}>
              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: "center" }}>
                {user.name}
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                component="p"
                gutterBottom
                style={{ marginTop: "0.5rem", fontWeight: "bold" }}
              >
                自己紹介
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary" style={{ marginTop: "0.5rem" }}>
                {user.profile ? user.profile : "よろしくお願いします。"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => isLikedUser(user.id) ? void (0) : handleCreateLike(user)}
              color="secondary"
              startIcon={isLikedUser(user.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              disabled={isLikedUser(user.id) ? true : false}
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              {isLikedUser(user.id) ? "いいね済み" : "いいね"}
            </Button>
            <Grid container justifyContent="center">
              <Button
                component={Link}
                to="/"
                variant="outlined"
                color="secondary"
              > 学習をくわしく見る
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="チャットができるようになりました!"
      />
    </>
  )
}

export default Users
