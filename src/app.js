const express= require('express')
const app = express()
const port = 3000

const reservas = require('./controller/reservas-controller')
const bd = require('./infra/sqlite-db')

app.use(express.json())
// app.use(cors())
app.use((req, res, next)=>{
  console.log("Rodei o middleware")
  next()
})


reservas(app,bd)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


module.exports = app