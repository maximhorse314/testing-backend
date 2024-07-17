interface PriceHistory {
  timestamp: number;
  price: number;
}

const priceStore: { [key: string]: PriceHistory[] } = {};

export const updatePriceStore = (coin: string, price: number) => {
  const timestamp = Date.now();
  if (!priceStore[coin]) {
    priceStore[coin] = [];
  }
  priceStore[coin].push({ timestamp, price });
};

export const getPriceInfo = (coin: string, minutes: number) => {
  const cutoff = Date.now() - minutes * 60000;
  const relevantPrices = priceStore[coin]?.filter((entry) => entry.timestamp > cutoff) || [];
  const latest = relevantPrices[relevantPrices.length - 1]?.price || null;
  const average =
    relevantPrices.reduce((acc, entry) => acc + entry.price, 0) / (relevantPrices.length || 1);
  return {
    latest,
    average: average.toFixed(2),
    history: relevantPrices,
    count: relevantPrices.length
  };
};
