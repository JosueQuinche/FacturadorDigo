import express, { Request, Response } from 'express';
import morgan from 'morgan';
import tenantRoute from './routes/tenantRoute';
import authRoute from './routes/authRoute';
import clientRoute from './routes/clientRoute';
import localRoute from './routes/localRoute';
import productRoute from './routes/productRoute';
import invoiceRoute from './routes/invoiceRoute';
import invoice_detailRoute from './routes/invoice_detailRoute';
import cors from 'cors';

const app = express();

// Middlewares
app.use(morgan('dev'));  // Registra las solicitudes HTTP
app.use(cors());
app.use(express.json())


// Ruta principal
app.get('/', (req: Request, res: Response) => {
    console.log('Hola Mundo');
    res.send("HOLA MUNDO");
});

// Rutas
app.use("/tenant", tenantRoute);         // Rutas de tenant
app.use("/auth", authRoute);             // Rutas de autenticación
app.use("/client", clientRoute);         // Rutas de clientes
app.use("/local", localRoute);           // Rutas de locales
app.use("/product", productRoute);      // Rutas de productos
app.use("/invoice", invoiceRoute);      // Rutas de facturas
app.use("/invoicedetail", invoice_detailRoute); // Rutas de detalles de facturas

export default app;
