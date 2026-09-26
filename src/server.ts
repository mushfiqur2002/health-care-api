
import { Request, Response } from "express";
import { app } from "./app"
import { envVars } from "./config/env";

app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
})

app.listen(envVars.PORT, () => {
    console.log(`server is running on port ${envVars.PORT}`)
})