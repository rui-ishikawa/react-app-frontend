import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion";

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import ChatRooms from "components/pages/ChatRooms"
import ChatRoom from "components/pages/ChatRoom"
import Users from "components/pages/Users"
import UserPages from "components/pages/UserPages"
import SignUp from "components/pages/SignUp"
import Root from "components/pages/Root"
import { About } from "components/pages/About"
import SignIn from "components/pages/SignIn"
import NotFound from "components/pages/NotFound"
import PostList from "./components/post/PostList"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"


// グローバルで扱う変数・関数（contextで管理）
export const AuthContext = createContext({} as {
  loading: boolean
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      console.log(res)

      if (res?.data.status === 200) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.currentUser)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <Route render={({ location }) => (
        <AnimatePresence exitBeforeEnter initial={false}>
          <AuthContext.Provider value={{ loading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
            <CommonLayout>
              <motion.div>
                <Switch location={location} key={location.pathname}>
                  <Route exact path="/" component={Root} />
                  <Route exact path="/abouts" component={About} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/signin" component={SignIn} />
                  <Private>
                    <Switch>
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/users" component={Users} />
                      <Route exact path="/user_pages/:id" component={UserPages} />
                      <Route exact path="/chat_rooms" component={ChatRooms} />
                      <Route path="/chatroom/:id" component={ChatRoom} />
                      <Route exact path="/posts" component={PostList} />
                      <Route component={NotFound} />
                    </Switch>
                  </Private>
                </Switch>
              </motion.div>
            </CommonLayout>
          </AuthContext.Provider>
        </AnimatePresence>
      )}
      />
    </Router>
  )
}

export default App
