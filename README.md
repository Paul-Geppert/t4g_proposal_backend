# T4G Proposal Backend

[![Alt text](https://tech.4germany.org/wp-content/uploads/2020/01/Logo-Final-02-copy-1-300x109-1.png)](https://tech.4germany.org)

This is a very simple and basic backend service to convert markdown texts to PDFs and offer them for download.

The generated PDF file will be stored in `./tmp/`.
Templates are stored in `./templates/`.

## Instructions

1. `npm install`
2. `npm start`
3. Send `POST` requests to `localhost:3000`, with { "content": "This markdown text will be converted to PDF" }

## API

- `GET /`: Download the current PDF file
- `POST /`: Create a PDF file from body:
    ```json
    {
        "content": "This markdown text will be converted to PDF"
    }
    ```
- `POST /replace/`: Create a PDF file from a template. Data from `maser_data` will be replaced in the template:
    ```json
    {
        "master_data": {
            "var_1": "Value that will be inserted into the template"
        },
        "content": "This markdown text will be converted to PDF"
    }
    ```
