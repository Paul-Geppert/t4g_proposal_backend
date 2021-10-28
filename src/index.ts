import cors from "cors";
import express, { Application, Request, Response } from "express";
import MarkdownPDF from "markdown-pdf";

import * as template from "../templates/general";
import * as xmlTemplate from "../templates/easyOnline";
import { fillTemplate, fillXMLTemplate } from "./controllers/templateController";

const prettyMdPdf = require("pretty-markdown-pdf");
const fs = require('fs').promises;

const app: Application = express();
const PORT = 3003;
const OUTPUTPATH_MD= "./tmp/doc.md";
const OUTPUTPATH_PDF = "./tmp/doc.pdf";
const OUTPUTPATH_XML = "./tmp/easyOnline.xml";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
}));

app.get(
    "/",
    (req: Request, res: Response) => res.download(OUTPUTPATH_PDF)
);

app.post(
    "/",
    (req: Request, res: Response) => {
        return fillXMLTemplate(xmlTemplate.default, req.body)
            .then((templ) => { return fs.writeFile(OUTPUTPATH_XML, templ); })
            .then(() => console.log())
            .then(() => { return fillTemplate(template.default, req.body) })
            .then((templ) => { return fs.writeFile(OUTPUTPATH_MD, templ) })
            .then(() => {
                prettyMdPdf.convertMd({ markdownFilePath: OUTPUTPATH_MD, outputFilePath: OUTPUTPATH_PDF })
                res.send();
            })
        // return fillTemplate(template.default, req.body)
        //     .then((template) => {
        //         MarkdownPDF({
        //             cssPath: "../assets/github-markdown.css"
        //         }).from.string(template).to(OUTPUTPATH, () => {
        //             console.log("Finished creation of PDF");
        //             res.status(200).send();
        //         });
        //     });
    }
);

app.get(
    "/xml/",
    (req: Request, res: Response) => res.download(OUTPUTPATH_XML)
);

try {
    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}
