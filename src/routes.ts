import { Application, Request, Response } from 'express';
import { getPriceInfo } from './priceStore';

export const setupRoutes = (app: Application) => {
  app.get('/price/:coin', (req: Request, res: Response) => {
    const { coin } = req.params;
    const minutes = parseInt(req.query.minutes as string, 10) || 60;
    const priceInfo = getPriceInfo(coin, minutes);
    res.json(priceInfo);
  });
};
