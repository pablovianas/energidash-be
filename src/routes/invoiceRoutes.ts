import express from 'express';
import { Invoice } from '../controllers/Invoices';
import { invoices } from '../utils/pdf-reading';
import { formatMonth } from '../utils/format-month';
import path from 'path';

const router = express.Router();

router.post('/create', async (_, res) => {
    const invoice = new Invoice();
    try {
        const result = await invoice.create(invoices);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.get('/:customerID', async (req, res) => {
    const invoice = new Invoice();
    try {
        const result = await invoice.getByCustomerID(req.params.customerID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.get('/', async (_, res) => {
    const invoice = new Invoice();
    try {
        const result = await invoice.getAll()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
})


router.post('/download/', async (req, res) => {
    const invoice = new Invoice();
    const { customerId, referenceMonth } = req.body

    try {
        const result = await invoice.getFileDownload(customerId, referenceMonth);

        const formattedMonth = formatMonth(result?.referenceMonth!)
        const fileName = `${result?.instalationId}-${formattedMonth}.pdf`

        res.status(200).json({fileName})
    
    } catch (error) {
        console.log(error);
    }
})

router.get('/download/:filename', async (req, res) => {
    const fileName = req.params.filename;

    const isProduction = process.env.NODE_ENV === 'production';

    const directoryPath = isProduction ? path.join(__dirname, './public/faturas') : path.join(__dirname, '../../public/faturas');

    res.download(directoryPath + '/' + fileName, fileName, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File downloaded successfully');
        }
    });
})

export default router;