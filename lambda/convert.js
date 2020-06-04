require("dotenv").config();
const axios = require("axios");
const { setupCache } = require("axios-cache-adapter");

const URL = "https://api.exchangeratesapi.io/latest";
const cache = setupCache({
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
});
const api = axios.create({
  adapter: cache.adapter,
});

exports.handler = async (event, _context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { from, to, amt } = event.queryStringParameters;
  if (!from || !to || !amt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "from, to and amt are required." }),
    };
  }

  const res = await api.get(`${URL}?base=${from}&symbols=${to}`);
  const rate = res.data.rates[to];
  const toAmt = (Number(amt) * rate).toFixed(2);

  return {
    statusCode: 200,
    body: JSON.stringify({
      amt: toAmt,
    }),
    headers: {
      "Cache-Control": `public, max-age=${10 * 60 /* 10 minutes */}, immutable`,
    },
  };
};
