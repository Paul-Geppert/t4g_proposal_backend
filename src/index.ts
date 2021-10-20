import express, { Application, Request, Response } from "express";
import cors from "cors";

import MarkdownPDF from "markdown-pdf";

const app: Application = express();
const PORT = 3003;
const OUTPUTPATH = "./tmp/doc.pdf";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
}));

app.post(
    "/",
    (req: Request, res: Response) => {
        const md = req.body.content;
        return MarkdownPDF({}).from.string(md).to(OUTPUTPATH, () => {
            res.status(200).send();
        });
    }
);

app.get(
    "",
    (req: Request, res: Response) => res.download(OUTPUTPATH)
);

try {
    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}
