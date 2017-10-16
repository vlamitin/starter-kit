switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./webpack/webpack-production.config');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./webpack/webpack-dev-server.config');
}