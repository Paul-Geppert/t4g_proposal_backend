import cors from "cors";
import express, { Application, Request, Response } from "express";
import MarkdownPDF from "markdown-pdf";

import * as template from "../templates/luftmobilitaet";

const app: Application = express();
const PORT = 3003;
const OUTPUTPATH = "./tmp/doc.pdf";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
}));

app.get(
    "/",
    (req: Request, res: Response) => res.download(OUTPUTPATH)
);

app.post(
    "/",
    (req: Request, res: Response) => {
        const md = req.body.content;
        return MarkdownPDF({}).from.string(md).to(OUTPUTPATH, () => {
            res.status(200).send();
        });
    }
);

app.post(
    "/replace/",
    (req: Request, res: Response) => {
        let md = template.default;
        for(const varName in req.body.master_data) {
            md = md.replace(`{${varName}}`, req.body.master_data[varName])
        }
        md = md.replace("{PROPOSAL_CONTENT}", req.body.content);
        return MarkdownPDF({}).from.string(md).to(OUTPUTPATH, () => {
            res.status(200).send();
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
