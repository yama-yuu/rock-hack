const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// 疎通確認用
app.get("/", (req, res) => {
  res.sendStatus(200)
})

// webhook用
app.post("/webhook", function(req, res) {
  res.send("HTTP POST request sent to the webhook URL!")
  // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
  if (req.body.events[0].type === "message") {
    // 文字列化したメッセージデータ
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          "type": "template",
          "altText": "this is a confirm template",
          "template": {
              "type": "confirm",
              "text": "Are you sure?",
              "actions": [
                  {
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                  },
                  {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                  }
              ]
          }
        }
      ]
    })

    // リクエストヘッダー
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    }

    // リクエストに渡すオプション
    const webhookOptions = {
      "hostname": "api.line.me",
      "path": "/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "body": dataString
    }

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d)
      })
    })

    // エラーをハンドル
    request.on("error", (err) => {
      console.error(err)
    })

    // データを送信
    request.write(dataString)
    request.end()
  }
})

// reply用
app.post("/template2", function(req, res) {
    console.log(req.body)
    res.send(req.body)

    var dataString = JSON.stringify(req.body)

    // リクエストヘッダー
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + dataString.events[0].replyToken
    }

    // リクエストに渡すオプション
    const webhookOptions = {
      "hostname": "api.line.me",
      "path": "/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "body": dataString
    }

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d)
      })
    })

    // エラーをハンドル
    request.on("error", (err) => {
      console.error(err)
    })

    // データを送信
    request.write(dataString)
    request.end()
})

// push通知用
app.post("/template", function(req, res) {
  console.log(req.body)
  res.send(req.body)

  var dataString = JSON.stringify(req.body)

  // リクエストヘッダー
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + req.body.events[0].replyToken
  }

  // リクエストに渡すオプション
  const webhookOptions = {
    "hostname": "api.line.me",
    "path": "/v2/bot/message/push",
    "method": "POST",
    "headers": headers,
    "body": dataString
  }

  // リクエストの定義
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d)
    })
  })

  // エラーをハンドル
  request.on("error", (err) => {
    console.error(err)
  })

  // データを送信
  request.write(dataString)
  request.end()
})

// 別アカウント用
app.post("/test", function(req, res) {

  const TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

  console.log(req.body)
  res.send(req.body)

  var dataString = JSON.stringify(req.body)

  // リクエストヘッダー
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }

  // リクエストに渡すオプション
  const webhookOptions = {
    "hostname": "api.line.me",
    "path": "/v2/bot/message/reply",
    "method": "POST",
    "headers": headers,
    "body": dataString
  }

  // リクエストの定義
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d)
    })
  })

  // エラーをハンドル
  request.on("error", (err) => {
    console.error(err)
  })

  // データを送信
  request.write(dataString)
  request.end()
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
