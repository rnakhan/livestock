import { finnhubClient } from './FinnHubClient';

const data = [
  {
    symbol: 'AAPL',
    description: 'Apple Inc',
    delta52: '-7.52%',
    h52: '146.25',
    l52: '212.42',
    price: '189.39',
    todayDelta: '1.2%',
    todayH: '180.45',
    todayL: '200.11',
  },
  {
    symbol: 'GOOG',
    description: 'Alphabet Inc',
    delta52: '-2.52%',
    h52: '2246.25',
    l52: '2122.42',
    price: '2189.28',
    todayDelta: '3.2%',
    todayH: '2200.45',
    todayL: '2175.99',
  },
];

// https://finnhub.io/docs/api/quote
const getQuote = (symbol) => {
  finnhubClient.quote('AAPL', (error, data, response) => {
    console.log(data);
  });
  finnhubClient.companyBasicFinancials(
    'AAPL',
    '52-week',
    (error, data, response) => {
      console.log(data);
    }
  );
};

export { getQuote };
