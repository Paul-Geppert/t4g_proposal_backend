import cors from "cors";
import express, { Application, Request, Response } from "express";
import MarkdownPDF from "markdown-pdf";

import * as pdf from "../templates/pdf";
import * as xmlTemplate from "../templates/easyOnline";
import { fillTemplate, fillXMLTemplate } from "./controllers/templateController";

const prettyMdPdf = require("pretty-markdown-pdf");
const fs = require('fs').promises;

// one of MarkdownPdf and PrettyMarkdownPdf
let MARKDOWN_CONVERTER_TO_USE = "PrettyMarkdownPdf";

const PORT = 3003;
const OUTPUTFOLDER = "./tmp"
const OUTPUTPATH_MD = `${OUTPUTFOLDER}/doc.md`;
const OUTPUTPATH_PDF = `${OUTPUTFOLDER}/doc.pdf`;
const OUTPUTPATH_XML = `${OUTPUTFOLDER}/easyOnline.xml`;

const app: Application = express();

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
        if (MARKDOWN_CONVERTER_TO_USE === "MarkdownPdf") {
            return fillXMLTemplate(xmlTemplate.default, req.body)
                .then((templ) => { return fs.writeFile(OUTPUTPATH_XML, templ); })
                .then(() => { return fillTemplate(pdf.default, req.body) })
                .then((template) => {
                    MarkdownPDF({
                        cssPath: "../assets/github-markdown.css"
                    }).from.string(template).to(OUTPUTPATH_PDF, () => {
                        console.log("Finished creation of PDF");
                        res.status(200).send();
                    });
                });
        }

        else if (MARKDOWN_CONVERTER_TO_USE === "PrettyMarkdownPdf") {
            return fillXMLTemplate(xmlTemplate.default, req.body)
                .then((templ) => { return fs.writeFile(OUTPUTPATH_XML, templ); })
                .then(() => { return fillTemplate(pdf.default, req.body) })
                .then((templ) => { return fs.writeFile(OUTPUTPATH_MD, templ) })
                .then(() => {
                    prettyMdPdf.convertMd({ markdownFilePath: OUTPUTPATH_MD, outputFilePath: OUTPUTPATH_PDF })
                    res.send();
                })
        }

        else {
            res.status(500).send("Could not find a matching Markdown to PDF converter");
        }
    }
);

app.get(
    "/xml/",
    (req: Request, res: Response) => res.download(OUTPUTPATH_XML)
);

try {
    fs.mkdir(OUTPUTFOLDER, { recursive: true })
        .then(() => {
            app.listen(PORT, (): void => {
                console.log(`Connected successfully on port ${PORT}`);
            });
        })
} catch (error) {
    console.error(`Error occured: ${error}`);
}
