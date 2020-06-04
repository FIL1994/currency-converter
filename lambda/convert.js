require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const API_KEY = process.env.API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      toAmt: 12,
    }),
  };
};
