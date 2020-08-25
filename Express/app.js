const express = require('express')
const bodyParser = require("body-parser")
const multer = require('multer')

//创建服务器
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//接口
//login api
app.post('/login',(req, res) => {
  console.log(req.body)
  let {username, password} = req.body
  if(username === 'admin' && password === '123123') {
    res.send({
      code: 200,
      message: '登录成功'
    })
  }else {
    res.send({
      code: 400,
      message: '账号或密码错误'
    })
  }
})

//获取hero
app.get('/getAllHero',(req, res) => {
  res.send('request received')
})

//add hero
app.post('/add',(req, res) => {
  res.send('request received')
})

//delete hero
app.get('/delete',(req, res) => {
  res.send('request received')
})

//根据id获取英雄
app.get('/getHeroByID',(req, res) => {
  res.send('request received')
})

//编辑英雄（根据id）
app.post('/edit',(req, res) => {
  res.send('request received')
})
//监听
app.listen(8888, () => {
  console.log('server is running')
})