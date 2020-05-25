## **MongoDB使用**

### 一、 什么是MongoDB

-    存储数据的软件 可以对数据进行有序的管理

- ​	动态网站的数据都是存储在数据库当中的
- ​    数据库可以用来持久储存客户端通过表单数据收集到的用户信息
- ​    数据库软件也可以对数据进行高效的管理  

### 二、 MongoDB安装

1. ​	下载地址 ： https://www.mongodb.com/download-center/community 
   - 这里还需要下载 MongoDB Compass （可以对数据进行可视化操做）  

### 三 、数据库相关概念 

- ​	一个数据中可以包含那多个数据仓库，每个数据仓库中包含多个数据集合，没饿过数据集合可以包含多个文档	

|    术语    | 解释说明                                                   |
| :--------: | :--------------------------------------------------------- |
|  database  | 数据库，mongnDB数据库软件中可以建立多个数据库              |
| collection | 集合·，一组数据的集合，可以理解为javaScript中的数组        |
|  document  | 文档，一条具体的数据，可以理解为javaScript中的对象         |
|   fileld   | 字段，文档当中的属性名称，可以理解为javaScript中的对象属性 |

### 四、数据库环境搭建

- 使用Node.js操做数据库MongoDB需要依赖第三方包mongoose
- 使用 npm install mongoose 进行下载安装

### 五、启动MongoDB

- ​	启动  在命令行工具使用net start mongodb  
- ​    关闭  在命令行工具使用net stop mongodb  
- ​    **需要注意的是，如果发生系统错误 5，使用管理员权限打开cmd即可**

### 六、进行数据库连接

- 使用mongoose提供的connect方法就可以连接数据库（这个方法返回一个promise对象）

  - 数据库默认连接端口27017
  
  - ````js
    mongoose.connect('mongodb://localhost/playground') // playground为地址
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log(err, "数据库连接失败")
  })
    ````

  - 引入mongoose   
  
  - ````js
    const mongoose = require('mongoose')
    
    mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
      .then(() => {
        console.log('数据库连接成功')
      })
      .catch(err => {
        console.log(err, '数据库连接失败')
      })
    //在终端运行这个文件 会显示数据库连接成功
    ````

### 七、MongoDB数据增删改查操做

#### 	1.	创建集合 

​	*创建集合分为2步，一是对**集合设定规则**，二是**创建集合**，创建excommunicate构造函数的实力即可创建集合*

````js
//设定集合规则
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	isPublished: Boolean // //代表当前是否处于发布状态
});
//创建集合并应用规则
const Course = mongoose.model('Course', courseSchema);
````

#### 2.创建文档 （实际上向集合中插入数据）

- ​	分为2步

  1. 创建集合实例
  2. 调用实力对象下的save方法将数据保存到数据库中

  ````javascript
  //创建文档  （向集合中插入数据）
  const course = new Course({
    name: 'Node.js学习',
    author: 'Dm',
    isPublished: true
  })
  //将数据保存到数据库中
  course.save()
  ````

- 终端执行该文件，打开数据库软件 可以看到这样的画面

- ![1590236967379](C:\Users\NB\Desktop\2222222222222.png)

- 第二种方法创建文档

- ````js
  Course.create({name: 'JavaScript', author: '张三', isPublished: true})
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
  ````

- ````js
  Course.create({name: 'JavaScript', author: '张三', isPublished: true}, (err, res) => {
      console.log(err)
      console.log(res)
  })
  ````

  完整代码

  ````js
  
  //引入mongoose
  const mongoose = require('mongoose')
  //连接数据库
  mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => {
      console.log('数据库连接成功')
    })
    .catch(err => {
      console.log(err, '数据库连接失败')
    })
  
  //设定集合规则
  const courseSchema = new mongoose.Schema({
  	name: String,
  	author: String,
  	isPublished: Boolean  //代表当前是否处于发布状态
  });
  //创建集合并应用规则
  const Course = mongoose.model('Course', courseSchema);
  
  // //创建文档  （向集合中插入数据）
  // const course = new Course({
  //   name: 'Node.js学习',
  //   author: 'Dm',
  //   isPublished: true
  // })
  // //将数据保存到数据库中
  // course.save()
  
  Course.create({name: 'JavaScript', author: '张三', isPublished: true})
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
  ````

### 八、MongoDB导入数据操做

1. 找到安装MOngoDB的安装目录，找到mongoimport.exe   复制路劲C:\Program Files\MongoDB\Server\4.2\bin,然后把这个目录添加到系统的环境变量当中

2. ````js
   // mongoimport -d 数据库名称 -c 集合名称 --file 要导入的数据文件
   mongoimport -d playground -c users --file ./data.json
   
   //终端显示这个 表示导入成功
   E:\node_text\database> mongoimport -d playground -c users --file ./data.json
   2020-05-23T23:32:38.153+0800    connected to: mongodb://localhost/
   2020-05-23T23:32:38.878+0800    1 document(s) imported successfully. 0 document(s) failed to import.
   
   E:\node_text\database>
   ````

3. ![1590248143038](E:\web笔记\Node笔记\mongoDB\1.png)

### 九、MongoDB查询你文档

####   1.      查询用户所有文档

​	（find方法，条件为空，返回所有的数据）

````js

//引入mongoose
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log(err, '数据库连接失败')
  })
//设定集合规则
const testSchema = new mongoose.Schema({
	name: String,
	age: Number,
  email: String,
  password: String,
  hobbies: [String]
});
//创建集合并应用规则
const Test = mongoose.model('Test', testSchema);

//创建文档  （向集合中插入数据）
const test = new Test(
{
  name: '王五',
	age: 20,
  email: '101120@qq.com',
  password: 'asdq123ww123',
  hobbies: ['写代码','划水','写作']
})
//将数据保存到数据库中
test.save()
//查询用户所有的文档
 Test.find().then(res => console.log(res))
````

#### 2.  通过id字段查询文档

````js
//通过id字段查询文档
 Test.find({_id: '5ec9b78fa5ab444bc45822df'}).then(res => {
  console.log(res)
 })
````

![1590279513736](E:\web笔记\Node笔记\mongoDB\2.png)

#### 3.  findOne返回一条文档，默认返回当前集合第一条文档

````js
//findOne返回一条文档，默认返回当前集合第一条文档
Test.findOne().then(res => console.log(res))
````

````js
//例如我们要查询name为李四的字段
Test.findOne({name: '李四'}).then(res => console.log(res))
//终端返回结果
E:\node_text\database>node 04.js
数据库连接成功
{
  hobbies: [ '写代码', '划水', '爬山' ],
  _id: 5ec9ba1caafc1235bcc664ee,
  name: '李四',
  age: 26,
  email: '1014560@qq.com',
  password: 'as456dqww123',
  __v: 0
}

````

#### 4. 通过区间查询文档数据

![1590281522685](E:\web笔记\Node笔记\mongoDB\3.png)

````js
//查询年龄大于20小于50之间的
Test.find({age: {$gt: 20,$lt: 50}}).then(res => {
  console.log(res)
})
//终端返回数据
[
  {
    hobbies: [ '写代码', '游戏', '吃水果' ],
    _id: 5ec9b9de34a1e14750868f73,
    name: '张风筝',
    age: 39,
    email: '101dfg0@qq.com',
    password: 'asdqwerww123',
    __v: 0
  }
]
````

````js
//查询爱好是爬山文档
Test.find({hobbies: {$in: ['爬山']}}).then(res => { //$in是包含
  console.log(res)
})
````

````js
//选择查询的字段
Test.find().select('name email -_id').then(res => { // -_id是把_id去掉，不想看到那个数据，前边加-就可以
  console.log(res)
})

//终端返回值
[
  { name: '张三', email: '1010@qq.com' },
  { name: '张风筝', email: '101dfg0@qq.com' },
  { name: '赵六', email: '1012340@qq.com' },
  { name: '李四', email: '1014560@qq.com' },
  { name: '王五', email: '101120@qq.com' }
]
````

````js
//根据年龄字段进行排序
//升序
Test.find().sort('age').then(res => {
  console.log(res)
})
//降序
Test.find().sort('-age').then(res => {
  console.log(res)
})
````

````js
//skip跳过多少条数据，limit限制查询数量
Test.find().skit(2).limit(2).then(res => {
  console.log(res)
})
````

### 十、MongoDB删除文档

````js
//删除单个文档
Test.findOneAndDelete({_id: '5ec9c33d6980a12da84c04be'}).then(res => {console.log(res)})
//删除多个文档
Test.deleteMany({}).then(res => {console.log(res)})
````

### 十一、更新文档数据

````js
//语法
Test.updateOne({查询条件}, {修改的值}).then(res => {console.log(res)})
Test.updateMany({查询条件}, {修改的值}).then(res => {console.log(res)})
//更改单条数据
Test.updateOne({name: '张三'}, {name: '张狗蛋'}).then(res => {console.log(res)})
//更新多个  
Test.updateMany({}, {age: '56'}).then(res => {console.log(res)})
````

### 十二、MongoDB验证

​	创建集合规则前，可以设置当前字段的验证规则，验证失败则输入插入失败

- required： true  必传字段
- minlength：3  字符串最小长度
- maxlength：7  字符串最大长度
- min： 2  数值最小为2
- max： 8 数值最小为8
- enum: ['css', 'Go', 'c++']
- trim: true  去除字符串两边的空格
- validate： 自定义验证器
- default： 默认值

````js
//引入mongoose
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log(err, '数据库连接失败')
  })
  const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, '传入标题'], //必选字段
      minlength: 2,  //长度不能小于2
      maxlength: 16,  //长度不能大于16
      trim: true   //去除两边的空格
    },
     age: {
      type: Number,
      min: 18,
      max: 80
    },
    publishDate: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      enum: ['css', 'html', 'java']
    },
    author: {
      type: String,
      validate: {
        validator: v => {
          //返回布尔值
          //true为成功
          // false为失败
          return  v && v.length > 4 
        },
        //自定义错误信息
        message: '不符合验证规则'
      }
  }) 
  const Post = mongoose.model("Post", postSchema)
  Post.create({title: '我是标题'}).then(res => {console.log(res)})
````

- 拿到错误信息

- ````js
  //引入mongoose
  const mongoose = require('mongoose')
  //连接数据库
  mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => {
      console.log('数据库连接成功')
    })
    .catch(err => {
      console.log(err, '数据库连接失败')
    })
    const postSchema = new mongoose.Schema({
      title: {
        type: String,
        required: [true, '传入标题'],
        minlength: 2,  //长度不能小于2
        maxlength: 16,  //长度不能大于16
        trim: true   //去除两边的空格
      },
      age: {
        type: Number,
        min: 18,
        max: 80
      },
      publishDate: {
        type: Date,
        default: Date.now
      },
      category: {
        type: String,
        enum: {
          values: ['html', 'css', 'java'],
          message: '分类名称要在要的范围内'
        }
      },
      author: {
        type: String,
        validate: {
          validator: v => {
            //返回布尔值
            //true为成功
            // false为失败
            return  v && v.length > 4 
          },
          //自定义错误信息
          message: '不符合验证规则'
        }
      }
    }) 
    const Post = mongoose.model("Post", postSchema)
    Post.create({title: '我是标题',age: 60,category: 'c++', author: 'bdd'}).then(res => {console.log(res)})
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          //获取错误对象
          const err = error.errors
          //遍历错误信息
          for (var arrt in err) {
            console.log(err[arrt]['message'])
          }
        })
  
  //终端显示为
  E:\node_text\database>node 08.js
  分类名称要在要的范围内
  不符合验证规则
  数据库连接成功
  ````

### 十三、集合关联

- 使用id对集合进行关联

- 使用populate方法进行惯技集合查询

- ````js
  //引入mongoose
  const mongoose = require('mongoose')
  //连接数据库
  mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => {
      console.log('数据库连接成功')
    })
    .catch(err => {
      console.log(err, '数据库连接失败')
    })
  
  //设定集合规则
  const userSchema = new mongoose.Schema({
  	name: {
      type: String,
      required: true
    }
  
  });
  const courseSchema = new mongoose.Schema({
  	title: {
      trpe: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  //创建集合并应用规则
  const User_t = mongoose.model('User_t', userSchema);
  const Course = mongoose.model('Course', courseSchema);
  //创建用户
  // User_t.create({name: '山姆一个'}).then(res => {console.log(res)})
  // Course.create({title: 123123, author: '5eca05ca06af282b80d9f998'}).then(res => {console.log(res)})
  Course.find().populate('author').then(res => {console.log(res)})
  ````

### 十四、案例练习

- #### 用户的增删改查操做  

- | 1.搭速网站服务器，实现客户端与服务器端的通信                 |
  | :----------------------------------------------------------- |
  | 2.连接数据库，创連用户集合，向集合中插入文档                 |
  | 3.当用户访问/lst时，将所有用户信忘查询出来                   |
  | 4.将用户信息和表格HTML进行拼接并将拼接结果响应回客户端       |
  | 5.当用户访问/add时，呈现表单页面，并实现添加用户信息功能     |
  | 6.当用户访可/ modify时，呈现修改页面，并实现修改用户信息功能 |
  | 7.当用户访问/ delete时，实现用户删除功能                     |

