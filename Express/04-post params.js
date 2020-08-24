const express = require('express')
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

//想要获取post请求参数，需要安装第三方包body-parser，通过request.body获取参数

app.post('/params', (request, response) => {
  console.log(request.body)
  response.send('this is a post api')
  
})
app.listen(3000, () => {
  console.log('server is running')
})