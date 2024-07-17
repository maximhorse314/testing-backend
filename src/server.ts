import express from 'express';
import cors from 'cors';
import { fetchPrices } from './fetchPrices';
import { setupRoutes } from './routes';

const app = express();
app.use(cors());

export const startServer = (port: number | string) => {
  setupRoutes(app);

  setInterval(fetchPrices, 60000); // Fetch prices every 60 seconds

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
