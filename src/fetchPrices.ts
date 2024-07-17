import axios from 'axios';
import { updatePriceStore } from './priceStore';

const COINS = ['bitcoin', 'ethereum', 'dogecoin'];

export const fetchPrices = async () => {
  try {
    const prices = await Promise.all(
      COINS.map(async (coin) => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
        return { coin, price: response.data.market_data.current_price.eur };
      })
    );
    prices.forEach(({ coin, price }) => {
      updatePriceStore(coin, price);
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};
