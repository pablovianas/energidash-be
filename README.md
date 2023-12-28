# EnergiDash Backend

This project consists of an intuitive dashboard for viewing electricity bills, providing a simplified and informative experience for users. Furthermore, it includes a functionality that allows you to easily and quickly download the desired invoices.

# Techs and libs

- Prisma
- Express
- TypeScript
- PDF-Parse
- PostgreSQL
- Copyfiles


# Routes

## Create Invoice

Endpoint: POST /create

Description: Creates a new invoice.
Success Response (HTTP 201): Returns the details of the created invoice.

Error Response (HTTP 500): Returns an object with the error message "Internal error".

## Get Invoices by Customer ID
Endpoint: GET /:customerID

Description: Gets all invoices associated with a specific customer ID.

URL Parameters:

customerID (string): Customer ID.
Success Response (HTTP 200): Returns the invoices associated with the customer.

Error Response (HTTP 500): Returns an object with the error message "Internal error".

## Get All Invoices
Endpoint: GET /

Description: Gets all available invoices.

Success Response (HTTP 200): Returns all invoices.

Error Response (HTTP 500): Returns an object with the error message "Internal error".

## Download Invoice in PDF
Endpoint: POST /download/

Description: Starts the process of downloading a PDF invoice.
Request Body (JSON):

customerId (string): Customer ID.

referenceMonth (string): Invoice reference month.
Success Response (HTTP 200): Returns a JSON object with the name of the PDF file.

Error Response (HTTP 500): Logs the error to the console.

## PDF File Download
Endpoint: GET /download/:filename

Description: Downloads the invoice PDF file with the specified name.
URL Parameters:

filename (string): Name of the PDF file.

Success Response: Starts downloading the PDF file.
Error Response: Logs the error to the console.


