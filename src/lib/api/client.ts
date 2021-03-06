// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換
import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import Cookies from "js-cookie"
import { apiURL } from '../../config'

// ヘッダーはケバブケースで良い.適用を無視するオプションを追加
const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
  baseURL: apiURL,
  // baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "multipart/form-data", // 画像ファイルを取り扱うのでform-dataで送信
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
}), options)

export default client
