import APP_CONSTANTS from '../constants';
export const NODE_ENV = process.env.NODE_ENV || APP_CONSTANTS.DEFAULT_ENV;

const ENV_CONFIG = require(`./${NODE_ENV}.js`);
const APP_PORT = ENV_CONFIG.APP_PORT || APP_CONSTANTS.DEFAULT_PORT;

const APP_CONFIG = {
    NODE_ENV,
    APP_PORT
};

export default APP_CONFIG;