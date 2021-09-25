import client from "lib/api/client"
import { CommentFormData } from "interfaces/index"

// メッセージを作成
export const createComment = (data: CommentFormData) => {
  return client.post("comments", data)
}
