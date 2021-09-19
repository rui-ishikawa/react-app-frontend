import { ComponentProps } from 'react';
import { motion } from "framer-motion";
import 'App.css';
import 'animate.css/animate.css'
import data from "data.json"

import MainImage from "components/MainImage/MainImage"
import Card from "components/Card/Card"

import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import {
  // useHistory,
  Link
} from "react-router-dom"
import { Typography } from "@material-ui/core"


const useStyles = makeStyles((theme: Theme) => ({
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

export const About = () => {
  const classes = useStyles()
  // const history = useHistory()
  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 800 }}
      exit={{ x: -800 }}
      transition={{ duration: 0.4 }}>
      <div className="App">
        <MainImage />
        <div className="card">
          {data.map((item: ComponentProps<typeof Card>, index: number) => {
            return (
              <Card title={item.title} description={item.description} imagePath={item.imagePath} key={index} />
            )
          })}
        </div>
        <div className="module--spacing--small"></div>
        <div>
          <p>ユーザー登録をしてサービスを使う</p>
          <Box textAlign="center" className={classes.box}>
            <Typography variant="body2">
              まだアカウントをお持ちでない方は
              <Link to="/signup" className={classes.link}>
                こちら
              </Link>
              から作成してください。
            </Typography>
          </Box>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
