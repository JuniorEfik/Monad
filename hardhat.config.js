require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // Load environment variables
require("colors");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  // networks:{
  //   holesky:{
  //     url: process.env.RPC_ENDPOINT_URL,
  //     accounts:[process.env.PRIVATE_KEY]
  //   }
  // }
};
