## Express框架

### 一、Express框架

#### 1. 	Express框架是什么

- Node平台web开发应用框架
- 使用 npm install express进行下载即可

#### 2. Express框架新特性

- 提供了方便简洁的路由定义方式
- 对获取HTP请求参数进行了简化处理
- 对模板引擎支持程度高，方便渲染动HTML页面
- 提供了中间件机制有效控制HTTP请求
- 拥有大量第三方中间件对功能进行扩

#### 3. Express初体验

````js
//引入express框架
const express = require('express')
//创建网站服务器
const app = express()

app.get('/',(req, res) => {
  //send()
  //1.send方法内部会检测响应内容的类型
  //2.send万法会自动设置http状态码
  //3．send万法会帮我们的动设置响应的内容类型及编码
  res.send('hello express')
})
app.listen(3000)
console.log('服务器成功了')
````

### 二、中间件

#### 2.1 什么是中间件

- 接受客户端发来的请求，可以对请求做出响应
- ![1590399552171](C:\Users\NB\AppData\Roaming\Typora\typora-user-images\1590399552171.png)

- 中间件有2部分组成，中间件方法以及请求处理函数

- 可以针对一个请求，设置多个中间件，同一个请求进行多次处理

- 默认情况下，请求从上到下一次执行，一旦匹配成功，终止匹配

- 可以调用next（）将请求的控制权交给下一个中间件，知道结束请求中间件为止

- ````js
  //引入express框架
  const express = require('express')
  //创建网站服务器
  const app = express()
  
  app.get('/request',(req, res,next) => {
    //send()
    //1.send方法内部会检测响应内容的类型
    //2.send万法会自动设置http状态码
    //3．send万法会帮我们的动设置响应的内容类型及编码
    req.name = '张三'
    next()
  })
  app.get('/request', (req,res) => {
    res.send(req.name)
  })
  
  app.listen(3000)
  console.log('服务器成功了')
  ````

#### 2.2 app.use用法

- ![1590400681060](C:\Users\NB\AppData\Roaming\Typora\typora-user-images\1590400681060.png)

- ````js
  
  //app.use方法使用
  //引入express框架
  const express = require('express')
  //创建网站服务器
  const app = express()
  
  app.use((req,res,next) => {
    console.log('请求走了app.use中间件')
    next()
  })
  app.use('/request',(req,res,next) => {
    console.log('请求走了request')
    next()
  })
  app.get('/list', (req,res,next) => {
   res.send('/list')
  })
  
  app.get('/request',(req, res,next) => {
    //send()
    //1.send方法内部会检测响应内容的类型
    //2.send万法会自动设置http状态码
    //3．send万法会帮我们的动设置响应的内容类型及编码
    req.name = '张三'
    next()
  })
  app.get('/request', (req,res) => {
    res.send(req.name)
  })
  app.listen(3000)
  console.log('服务器成功了')
  ````

#### 2.3 中间件应用

- 路由保沪，客户端在问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面；

- 网站维护公告。在所有路由的最上面定义接收所有清求的中间件，直接为客户端做出响应，网站正在维护中；

- 自定义404

- ````js
  //案例一
  //app.use方法使用
  //引入express框架
  const express = require('express')
  //创建网站服务器
  const app = express()
  
  app.use((req, res, next) => {
    let isLogin = true;
    if(isLogin) {
      next()
    }else {
      res.send('您还没有登录，不能访问admin页面')
    }
  })
  app.get('/admin', (req, res, next) => {
    res.send('您已经登录，可以访问admin页面')
  })
  
  app.listen(3000)
  console.log('服务器成功了')
  ````

  ````js
  //案例二
  
  //app.use方法使用
  //引入express框架
  const express = require('express')
  //创建网站服务器
  const app = express()
  
  app.use((req, res, next) => {
    let isLogin = true;
    if(isLogin) {
      next()
    }else {
      res.send('您还没有登录，不能访问admin页面')
    }
  })
  app.get('/admin', (req, res, next) => {
    res.send('您已经登录，可以访问admin页面')
  })
  
  app.use((req, res, next) => {
    //为客户端响应404状态码及提示信息
    res.status(404).send('请求的页面不存在哦')
  })
  
  app.listen(3000)
  console.log('服务器成功了')
  ````

#### 2.4 错误处理中间件

- 在程序执行的过程中，不可避免的会出现一些无法预料的错误，比如文件读取失败，数据库连接失败，错误处理中间件是一个集中处理错误的地方

- ````js
  app.use((err,reg，res,next）=>{
  res.status(500).send('服务器发生末知错误')
  })
  ````

- 当程序出现错误时调用next（）方法，并且将错误信息通过参数形式传递给next方法，即可发错误处理中间件

- ````
  app．get（
  (req，res,next)=>{
  fs．readFi1e（"/ti1e一0005一not一exst"
  (err){
  next(err)，
  data)=>{
  ````

- ````js
  //综合代码
  //引入express框架
  const express = require('express')
  //创建网站服务器
  const app = express()
  
  app.get('./index', (req, res) => {
    throw new Error('发生了未知的错误')
  })
  
  app.use((err, res, req, next) => {
    res.status(500).send(err.message)
  })
  
  app.listen(3000)
  console.log('服务器成功了')
  ````

  