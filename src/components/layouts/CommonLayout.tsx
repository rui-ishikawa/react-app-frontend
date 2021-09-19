import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/Header"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "1rem"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container justifyContent="center">
            {children}
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CommonLayout
