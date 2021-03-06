import React, { useState, useEffect, useContext } from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Grid, Typography } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { LikeFormData } from "interfaces/index"

import { getLikes, createLike } from "lib/api/likes"
import { User, LikeData } from "interfaces/index"
import { AuthContext } from "App"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 480,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(6, 8, 7),
    },
    button: {
      color: "#f87ede",
    },
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
  }),
);

type UserModalProps = {
  user: User
}

const UserModal: React.FC<UserModalProps> = function ({ user }) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [userDetailOpen, setUserDetailOpen] = useState<boolean>(false);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [likes, setLikes] = useState<LikeData[]>([]);

  // フォームデータを作成
  const createFormData = (): LikeFormData => {
    const formData = new FormData();

    formData.append("fromUserId", String(currentUser?.id));
    formData.append("toUserId", String(user.id));

    return formData;
  };

  // いいね作成
  const handleCreateLike = async (user: User) => {

    const data = createFormData();

    try {
      const res = await createLike(data);
      console.log(res);

      if (res?.status === 200) {
        setLikes([res.data.like, ...likes]);
        setLikedUsers([user, ...likedUsers]);

        console.log(res?.data.like);
      } else {
        console.log("Failed");
      }

      if (res?.data.isMatched === true) {
        // setAlertMessageOpen(true)
        setUserDetailOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // いいね一覧を取得
  const handleGetLikes = async () => {
    try {
      const res = await getLikes();
      console.log(res);

      if (res?.status === 200) {
        setLikedUsers(res?.data.activeLikes);
      } else {
        console.log("No likes");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // handleGetUsers()
    handleGetLikes();
  }, []);

  // すでにいいねを押されているユーザーかどうかの判定
  const isLikedUser = (userId: number | undefined): boolean => {
    return likedUsers?.some((likedUser: User) => likedUser.id === userId);
  };

  const handleClose = () => {
    setUserDetailOpen(false);
  };

  return (
    <>
      <div
        onClick={() => {
          setUserDetailOpen(true);
        }}
      >
        <Button
          variant="text"
          className={classes.button}
        >
          ユーザーについて
        </Button>
      </div>
      <div>
        <Dialog
          open={userDetailOpen}
          onClose={handleClose}
          keepMounted
        >
          <DialogContent>
            <Grid container justifyContent="center">
              <Grid item>
                <Avatar
                  alt="avatar"
                  src={user.image?.url}
                  className={classes.avatar} />
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
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default UserModal
