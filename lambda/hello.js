const axios = require("axios");

exports.handler = async (event) => {
  const subject = event.queryStringParameters.name || "World";

  return {
    statusCode: 200,

    body: `Hello ${subject}!`,
  };
};
