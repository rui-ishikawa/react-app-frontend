import client from "lib/api/client"
import { ChatRoomFormData } from "interfaces/index"

// メッセージを作成
export const createMessage = (data: ChatRoomFormData) => {
  return client.post("messages", data)
}
