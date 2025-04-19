const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests from this IP. Try again later.",
  skip: (req) => req.method !== "GET",
});