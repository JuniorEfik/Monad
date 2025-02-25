const { ethers } = require("hardhat");

module.exports = ((KEY) => {
    // Provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
    return new ethers.Wallet(KEY, provider);
});