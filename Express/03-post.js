const express = require('express')

const app = express()

app.post('/params', (request, response) => {
  
  response.send('this is a post api')
  
})
app.listen(3000, () => {
  console.log('server is running')
})