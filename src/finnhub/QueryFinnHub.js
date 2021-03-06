import { finnhubClient } from './FinnHubClient';

const data = [
  {
    symbol: 'AAPL',
    description: 'Apple Inc',
    delta52: '-7.52%',
    h52: '146.25',
    hdt52: '2021-01-25',
    l52: '212.42',
    ldt52: '2020-03-31',
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
    hdt52: '2021-01-25',
    l52: '2122.42',
    ldt52: '2020-03-31',
    price: '2189.28',
    todayDelta: '3.2%',
    todayH: '2200.45',
    todayL: '2175.99',
  },
];

// https://finnhub.io/docs/api/quote
const getQuote = (symbol) => {
  /*
    Quote: {
      c, h, l, o, pc
    }
  */
  finnhubClient.quote('AAPL', (error, data, response) => {
    console.log(data);
  });

  /*
    BasicFinancials: {
      symbol,
      metric: {
        52WeekHigh: 145.09
        52WeekHighDate: "2021-01-25"
        52WeekLow: 53.1525
        52WeekLowDate: "2020-03-23"
      }
    }
  */
  finnhubClient.companyBasicFinancials(
    'AAPL',
    'all',
    (error, data, response) => {
      console.log(data);
    }
  );
};

export { getQuote };
