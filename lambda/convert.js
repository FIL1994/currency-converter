const axios = require("axios");

exports.handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // console.log(_context, process.env);
  console.log("API_KEY" in _context, "API_KEY" in process.env);

  return {
    statusCode: 200,
    body: JSON.stringify({
      toAmt: 12,
    }),
  };
};
