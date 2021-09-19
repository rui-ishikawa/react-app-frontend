import { AxiosPromise } from "axios"
import Cookies from "js-cookie"

import client from "./client"
import { PostApiJson } from "../../interfaces/index"

// post取得
export const getPosts = (): AxiosPromise<PostApiJson> => {
  return client.get("/posts", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}

// post作成
export const createPost = (data: FormData): AxiosPromise => {
  return client.post("/posts", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }
  )
}

// post削除
export const deletePost = (id: string): AxiosPromise => {
  return client.delete(`/posts/${id}`)
}
