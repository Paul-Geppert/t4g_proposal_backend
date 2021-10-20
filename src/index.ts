import express, { Application, Request, Response } from "express";

import MarkdownPDF from "markdown-pdf";

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
    "/",
    (req: Request, res: Response) => {
        const outputPath = "./tmp/doc.pdf";

        const md = req.body.content;

        return MarkdownPDF({}).from.string(md).to(outputPath, () => {
            res.download(outputPath);
        });
    }
);

try {
    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}
