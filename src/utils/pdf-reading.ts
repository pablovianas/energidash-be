import path from 'path';
import fs from 'fs';
import pdfParse from "pdf-parse";
import { extractInformations } from './extract-text';


type PDFData = {
    text: string
}

type Invoices = {
    customerId: string;
    instalationId: string;
    referenceMonth: string;
    electricEnergy: {
        electricEnergyKwh: string;
        electricEnergyValue: string;
    };
    sceeeEnergy: {
        sceeeEnergyKwh: string;
        sceeeEnergyValue: string;
    };
    compensatedEnergy: {
        compensatedEnergyGdIKwh: string;
        compensatedEnergyGdIValue: string;
    };
    municipalPublicLightingContributionValue: number;
};

const invoices: Invoices[] = [];

function readPDF (){

    const isProduction = process.env.NODE_ENV === 'production';

    const invoicesFolder = isProduction
        ? path.join(__dirname, './public/faturas')
        : path.join(__dirname, '../../', './public/faturas');

    console.log(invoicesFolder);

    const PDFFiles = fs.readdirSync(invoicesFolder)
        .filter(file => file.toLowerCase().endsWith('.pdf'));

    PDFFiles.forEach(file => {
        const PDFPath = path.join(invoicesFolder, file);

        const pdfFile = fs.readFileSync(PDFPath);

        pdfParse(pdfFile).then(function (data: PDFData) {
            const extractedInformations = extractInformations(data.text.split('\n'));
            invoices.push(extractedInformations)

        });

    })


    setTimeout(() => {
        console.log(invoices)
    }, 3000)
}


export { invoices, readPDF }