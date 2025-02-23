#!/usr/bin/env node
const hre = require("hardhat");
const signer = require("./setup");
const safeMint = require("./safeMint");

async function main() {
    /**
     * @dev make sure the first argument has the same name as your contract in the SoulBoundTest.sol file
     * @dev the second argument must be the message we want to set in the contract during the deployment process
     */
    // const keys = JSON.parse(process.env.PRIVATE_KEY);
    for (key of JSON.parse(process.env.PRIVATE_KEY)) {
        console.log(key);
        const signed = signer(key);
        const contract = await hre.ethers.deployContract("SoulBoundTest", [`${signed.address}`]);

        await contract.waitForDeployment();

        console.log(`Monad contract deployed to ${contract.target}`);

        await safeMint(signed, contract.target);
    }
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});