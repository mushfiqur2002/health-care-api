import express from 'express';
import { prisma } from './lib/prisma';
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello world");
    console.log("hello world");
});
// create specialty router 
app.post("/specialty", async (req, res) => {
    const specialty = await prisma.specialty.create({
        data: {
            title: 'Cardiology',
        }
    });
    res.status(200).send({
        created: true,
        data: specialty
    });
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
