import express from "express";
import { Request, Response } from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json())
app.post("/login", function (req: Request, res: Response) {
    const { username, password } = req.body
    if (username === 'Veronica' && password === "1234") {
        res.json({ displayName: "Veronica From Express" });
    } else {
        res.status(400).json({ msg: "Invalid username or password" })
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});
