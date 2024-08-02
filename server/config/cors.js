const cors = {
    development: {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200 
    },
    production: {
        origin: 'https://your-production-site.com',
        optionsSuccessStatus: 200
    }
};

module.exports = cors;