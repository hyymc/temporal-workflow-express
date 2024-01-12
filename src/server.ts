import express from 'express';
import { OpenAccount } from './types/workflow-commands';
import {openAccountUseCase} from'./client'
const app = express();

const PORT = 3999
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/api/v2/accounts" ,async(req, res) => {
  const params = req.body as OpenAccount
  try {
    await openAccountUseCase(params)
    res.json({message: "ok"})
  } catch (error) {
    res.status(500)
    res.json({error: (error as Error).toString()})
  }
})

app.listen(PORT, () => {
  console.log("🚀 Listening on ", PORT)
})