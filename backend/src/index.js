import express from 'express'
import 'dotenv/config'
import dbconnection from './config/dbconnection.js'
import authrouter from './routes/authrouter.js'
import userrouter from './routes/userrouter.js'
import verifytoken from './middlewares/authmid.js'
import authrole from './middlewares/authrole.js'
import cors from 'cors'
const app = express()
const port= process.env.PORT || 3000

dbconnection()

app.use(express.json())
app.use(cors())
app.use("/", authrouter)
app.use("/user",verifytoken,authrole("user","admin"), userrouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})