# T4G Proposal Backend

[![Alt text](https://tech.4germany.org/wp-content/uploads/2020/01/Logo-Final-02-copy-1-300x109-1.png)](https://tech.4germany.org)

This project/repository is a very simple **prototype** to showcast one specific functionality: Create a proposal for public funding application, and insert it into the existing [easy-Online](https://foerderportal.bund.de/easyonline/) system via XML upload. Further, an additional PDF will be generated, containing all relevant information, to support easy-Online, but also other submission methods like email.

It is not intended to be used in production or as reference for a future implementation.

Find more information about the project here: \<link will be added soon>.

This is a very simple and basic backend service to:

- generate PDFs based on templates and markdown input
- generate XMLs compatible with easy-Online, filled with the given input data
- provide the generated pdf and xml file for download

The generated PDF and XML file will be stored in `./tmp/`.
Templates are stored in `./templates/`.

The current example is implemented for:

| | |
--|--
| 1. Ministerium/Bundesbehörde: | Bundesministerium für Verkehr und digitale Infrastruktur |
| 2. Fördermaßnahme: | Nationales Innovationsprogramms Wasserstoff- und Brennstoffzellentechnologie Phase II |
| 3. Förderbereich: | Forschung, Entwicklung und Innovation - Schwerpunkt Nachhaltige Mobilität |
| 4. Verfahren: | Skizze |

The website is [https://foerderportal.bund.de/easyonline/formularassistent.jsf](https://foerderportal.bund.de/easyonline/formularassistent.jsf).

## PDF generation frameworks

We added two very simple PDF generation frameworks: [markdown-pdf](https://www.npmjs.com/package/markdown-pdf) and [pretty-markdown-pdf](https://www.npmjs.com/package/pretty-markdown-pdf).

One can switch between them by changing `MARKDOWN_CONVERTER_TO_USE` in `src/index.ts`.

The reason, we added both are their different functionalities. Find more information below:

- both frameworks:
  - generated pdf file needs to be saved locally
- markdown-pdf
  - no support of \<br> and similar html-elements
  - link on pictures prints the link below the image
  - little bit more flexibility, e.g.
    - input string, or file, or other sources as markdown input
    - simple integration of external css-files
- pretty-markdown-pdf
  - indeed looks prettier when used out of the box
  - file is only input source
    - inefficient -> fill template, save md-file, pdf generation, save pdf file

## Current flaws and problems

This project is just a very simple prototype to showcast one specific functionality. It is not intended to be used in production or as reference for a future implementation.

However, here are the main points that should be addressed in the future:

- markdown to PDF generation is only chosen for showcasing
  - a future implementation may not rely on markdown texts
  - or may use more sophisticated solutions
- the existing PDF generation is inefficient
  - find more information above
- no authorization, authentication, no user management
- PDF and XML generation relies on templates, maybe a dynamic generation is more useful
- data validation is performed in frontend only
  - the same data validation as in easy-Online needs to be implemented to assure correct XML data
- content (questions, order of questions, example data, ...) is hardcoded in frontend
  - it should come from the backend
  - that way a better and simpler data validation and PDF/XML generation is possible

For a future implementation consider to get in contact with the DLR *(Deutsches Zentrum für Luft und Raumfahrt)* to discuss getting access to their API.

Find a document which addresses this problems and proposes a solution when implementing the real system here:
\<link will be added soon>

## Instructions

1. Install dependencies: `npm install`
2. Start the server: `npm start`

## API

- `GET /`: Download the current PDF file
- `GET /xml/`: Download the current XML file
- `POST /`: Create a PDF file from body:

    ```json
    {
        "creator": {},
        "partners": [],
        "leader": {},
        "communicationPartner": {},
        "executor": "string",
        "dataProtection": "bool",
        "freeText": [],
    }
    ```
