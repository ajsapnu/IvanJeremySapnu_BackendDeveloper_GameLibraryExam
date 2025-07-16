const rateLimit = require('express-rate-limit');
module.exports = rateLimit ({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'too many requests, please try again later'
});
// limiting request