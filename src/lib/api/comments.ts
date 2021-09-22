import client from "lib/api/client"
import { PostFormData } from "interfaces/index"

// メッセージを作成
export const createComment = (data: PostFormData) => {
  return client.post("commnets", data)
}
