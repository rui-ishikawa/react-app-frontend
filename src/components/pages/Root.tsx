import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom"
import { motion } from "framer-motion";

import Background from "../../images/top03-image.jpeg";


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: theme.spacing(20, 20, 40),
  },
  heroButtons: {
    marginTop: theme.spacing(15),
  },
  content: {
    color: "white"
  },
}));

export default function Root() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 800 }}
        exit={{ x: -800 }}
        transition={{ duration: 0.4 }}>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="xl">
              <Typography className={classes.content} component="h1" variant="h3" align="center" gutterBottom>
                「困り感」のある子どもを支えるママ、パパのためのサービスです
              </Typography>
              <Typography className={classes.content} variant="h5" align="center" paragraph>
                不登校や発達障害など「困り感」のある子どもと寄り添うママ、パパ
              </Typography>
              <Typography className={classes.content} variant="h5" align="center" paragraph>
                みんなの頑張りを共有しよう
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={5} justifyContent="center">
                  <Grid item>
                    <Button
                      component={Link}
                      variant="contained"
                      color="inherit"
                      to="/signup"
                    >
                      ユーザー登録
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="inherit"
                      component={Link}
                      to="/abouts"
                    >
                      ABOUT
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
      </motion.div>
    </React.Fragment>
  );
}

