const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');

// Replace 'YOUR_GC_ACCESS_TOKEN' with your actual GoCardless access token
const accessToken = process.env.GOCARDLESS_ACCESS_TOKEN 

// Initialize the client for the sandbox environment
const client = gocardless(
  accessToken,
  constants.Environments.Sandbox,
  { raiseOnIdempotencyConflict: true },
);

export default client;
