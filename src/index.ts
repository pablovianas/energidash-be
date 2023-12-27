import express from 'express'
import cors from 'cors'
import InvoceRoutes from './routes/invoiceRoutes'
import { readPDF } from './utils/pdf-reading';


const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/invoices', InvoceRoutes);

readPDF();

app.listen(3000, () =>
    console.log('REST API server ready'),
)