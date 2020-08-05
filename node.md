​	Node 学习

#### 1、Path模块学习

````js
console.log(__dirname)  //获取模块所在的路径（不包含文件名）
console.log(__filename) //获取模块所在路径（包含文件名）
let extname = path.extname(__filename)  //后缀名
console.log(extname)

let basename = path.basename(__filename) //获取路径下的文件名
console.log(basename)

let dirname = path.dirname(__filename)  //获取模块所在的路径
console.log(dirname)

let path_parse = path.parse(__filename)
console.log(path_parse)

// 路劲的拼接 join  会将参数默认/进行拼接
let fullPath = path.join(__dirname, 'path.js')
console.log(fullPath)
````

#### 2、创建buffer对象

````js
let buf1 = Buffer.from([97, 98, 99])   //创建一个Buffer 对象
console.log(buf1)   //转为16进制
console.log(buf1.toString())     //toString()可以看到里边的真实数据

let buf2 = Buffer.from('node.js')
console.log(buf2)
console.log(buf2.toString())

let buf3 = Buffer.alloc(10) // 创建一个10个字符的buffer对象
buf3.write('hello world')  //重写buffer对象
console.log(buf3)
console.log(buf3.toString())
// 以后看到<Buffer ...>使用toString()可以看到真实的数据
````

#### 3、fs读取文件

- 同步读取

````js
const fs = require('fs')
const path = require('path')

// fs.readFile()  异步  读数据的时候代码继续执行
// fs.readFileSync()  同步 只有把数据读取完成之后 才执行后边的代码

// let file = fs.readFileSync(path.join(__dirname, 'text.txt'))
// console.log(file.toString())

let file = fs.readFileSync(path.join(__dirname, 'text.txt'), 'utf-8')
console.log(file)
//打印结果
PS E:\Vue text\dm11\node> node .\01-fs.js
hello  nodejs
````

- 异步读取

````js
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (error, data) => {
  console.log(error)
  console.log(data)
})
//打印
PS E:\Vue text\dm11\node> node .\02-fs异步读取.js
null
hello  nodejs
````

- 异步写入文件

````js
const fs = require('fs')
const path = require('path')

let filePath = path.join(__dirname, 'files', 'hello nodejs.txt')

fs.writeFile(filePath,'你好啊 node.js', (error) => {
  console.log(error)
})
````

#### 4、http网络模块

1. 