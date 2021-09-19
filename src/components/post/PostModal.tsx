import React, { useEffect, useState } from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PostForm from './PostForm';
import { getPosts } from "../../lib/api/posts"
import { Post } from "../../interfaces/index"
import Button from "@material-ui/core/Button"


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  }),
);

export default function PostModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = useState<Post[]>([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleGetPosts = async () => {
    const { data } = await getPosts()

    setPosts(data.posts)
  }

  useEffect(() => {
    handleGetPosts()
  }, [])


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <PostForm
        handleGetPosts={handleGetPosts}
      />
    </div>
  );

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        className={classes.button}
      >
        作成する
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
