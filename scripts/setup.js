const { ethers } = require("hardhat");

module.exports = ((KEY) => {
    const URL = process.env.RPC_ENDPOINT_URL;
    // Provider and signer
    const provider = new ethers.JsonRpcProvider(URL);
    return new ethers.Wallet(KEY, provider);
});