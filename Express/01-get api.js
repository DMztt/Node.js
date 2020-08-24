const express = require('express')

const app = express()

app.get('/params', (request, response) => {
  let arr = [`拟古

  南北朝：鲍照
  
  幽并重骑射，少年好驰逐。
  毡带佩双鞬，象弧插雕服。
  兽肥春草短，飞鞚越平陆。
  朝游雁门上，暮还楼烦宿。
  石梁有余劲，惊雀无全目。
  汉虏方未和，边城屡翻覆。
  留我一白羽，将以分虎竹。
  `,`身无彩凤双飞翼，心有灵犀一点通`,`人生若只如初见，何事秋风悲画扇`, '今人不见古时月，今月曾经照古人']
  let index = Math.floor(Math.random()*4)
  response.send(arr[index])
  
})
app.listen(3000, () => {
  console.log('server is running')
})