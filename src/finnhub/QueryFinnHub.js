import { finnhubClient } from './FinnHubClient';
import { delay } from '../common/Utils';

/* data format
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
  }
*/

const printQuote = (symbol) => {
  getQuote(symbol, console.log);
};

// https://finnhub.io/docs/api/quote
const getQuote = async (symbol, handleQuote) => {
  /*
    Quote: {
      c, h, l, o, pc
    }
  */
  let c;
  finnhubClient.quote(symbol, (error, data, response) => {
    const { h, l, pc } = data;
    c = data.c;
    handleQuote({
      symbol: symbol,
      price: c.toString(),
      todayDelta: (((c - pc) / pc) * 100).toPrecision(3) + '%',
      todayH: h,
      todayL: l,
      pc: pc,
    });
  });

  // Now randomly try this in 1 out of 5 attempts
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

  await delay(500);

  finnhubClient.companyBasicFinancials(
    symbol,
    'all',
    (error, data, response) => {
      const { metric } = data;
      handleQuote({
        symbol: symbol,
        h52: metric['52WeekHigh'] ? metric['52WeekHigh'].toString() : 'x',
        hdt52: metric['52WeekHighDate'],
        l52: metric['52WeekLow'] ? metric['52WeekLow'].toString() : 'y',
        ldt52: metric['52WeekLowDate'],
        delta52: metric['52WeekHigh']
          ? (
              ((c - metric['52WeekHigh']) / metric['52WeekHigh']) *
              100
            ).toPrecision(3) + '%'
          : '0',
      });
    }
  );
};

export { getQuote, printQuote };
