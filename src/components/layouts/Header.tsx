import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonIcon from "@material-ui/icons/Person"
import SearchIcon from "@material-ui/icons/Search"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "black"
  },
  linkBtn: {
    textTransform: "none",
    marginLeft: theme.spacing(0.5),
  },
  bar: {
    backgroundColor: "#fff"
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  }
}))

const Header: React.FC = () => {
  const { loading, isSignedIn } = useContext(AuthContext)
  const classes = useStyles()

  // 認証済みかどうかで表示ボタンを変更
  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <div className={classes.buttons}>
              <IconButton
                component={Link}
                to="/users"
                edge="start"
                className={classes.linkBtn}
                color="primary"
                size="medium"
              >
                <SearchIcon />
                サーチ
              </IconButton>

              <IconButton
                component={Link}
                to="/posts"
                edge="start"
                className={classes.linkBtn}
                color="primary"
                size="medium"
              >
                <BorderColorIcon />
                ポスト
              </IconButton>

              <IconButton
                component={Link}
                to="/chat_rooms"
                edge="start"
                className={classes.linkBtn}
                color="primary"
                size="medium"
              >
                <ChatBubbleIcon />
                チャット
              </IconButton>

              <IconButton
                component={Link}
                to="/home"
                edge="start"
                className={classes.linkBtn}
                color="primary"
                size="medium"
              >
                <PersonIcon />
                ホーム
              </IconButton>
            </div>
          </>
        )
      } else {
        return (
          <>
            <IconButton
              component={Link}
              to="/signin"
              edge="start"
              className={classes.linkBtn}
              color="primary"
              size="small"
            >
              <ExitToAppIcon />
              サインイン
            </IconButton>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>

      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
          >
            TeamTeaching
          </Typography>
        </Toolbar>
        <AuthButtons />
      </AppBar>
    </>
  )
}

export default Header
