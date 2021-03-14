const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
if (process.env.NODE_ENV == 'production') {
  api_key.apiKey = process.env.REACT_APP_FINNHUB_PROD_API_KEY;
} else {
  api_key.apiKey = process.env.REACT_APP_FINNHUB_SANDBOX_API_KEY;
}
const finnhubClient = new finnhub.DefaultApi();

const FINN_HUB_KEY = api_key.apiKey;

export { finnhubClient, FINN_HUB_KEY };
