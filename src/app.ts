import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/modules/product/product.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
