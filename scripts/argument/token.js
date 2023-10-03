const dotenv = require("dotenv");
dotenv.config();
module.exports = [process.env.TAX_WALLET, process.env.TAX_FEE];
