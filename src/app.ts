import express, { Application } from 'express'
import { IndexRouter } from "./routes/index"

export const app: Application = express()
export const port = process.env.PORT || 5000

app.use(express.json())

app.use("/health-care-api", IndexRouter)
