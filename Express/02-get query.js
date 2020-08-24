const express = require('express')
const { response } = require('express')

const app = express()

app.get('/params', (request, response) => {
  console.log(request.query.heroname)
  let name = ''
  switch(request.query.heroname) {
    case '李白':
      name = '千里杀一人'
      break;
    case '吕布':
      name = '方天画戟'
      break;
    case '卫鞅':
      name = '大秦帝国'
      break;
    default:
      name = '404'
      break;
  }
  response.send(name)
})


app.listen(3000, () => {
  console.log('server is running')
})