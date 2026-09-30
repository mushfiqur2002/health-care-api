import express, { Application } from 'express'
import { IndexRouter } from "./app/modules/routes/index"
import { gloabalErrorHandler } from './app/middleware/globalErrorHandler'
import { notFound } from './app/middleware/notFound'

export const app: Application = express()
export const port = process.env.PORT || 5000

app.use(express.json())

app.use("/health-care-api", IndexRouter)
app.use(gloabalErrorHandler)
app.use(notFound)