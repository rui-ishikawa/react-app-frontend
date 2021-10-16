import client from "lib/api/client"
import { CommentFormData } from "interfaces/index"
import Cookies from "js-cookie"
import { AxiosPromise } from "axios"

// メッセージを作成
export const createComment = (data: CommentFormData) => {
  return client.post("comments", data)
}

export const getComments = () => {
  return client.get("comments", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}

export const deleteComment = (id: string): AxiosPromise => {
  return client.delete(`/comments/${id}`)
}
