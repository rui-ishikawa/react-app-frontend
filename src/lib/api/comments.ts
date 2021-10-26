import client from "lib/api/client"
import { CommentFormData } from "interfaces/index"
import Cookies from "js-cookie"
import { AxiosPromise } from "axios"

// メッセージを作成
export const createComment = (data: CommentFormData, id: number) => {
  return client.post(`posts/${id}/comments`, data)
}

export const getComments = (id: number) => {
  return client.get(`posts/${id}/comments`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}

// コメント削除
export const deleteComment = (id: string): AxiosPromise => {
  return client.delete(`/comments/${id}`)
}
