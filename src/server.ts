
import { Request, Response } from "express";
import { app, port } from "./app"

app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})