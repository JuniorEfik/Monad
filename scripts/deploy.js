#!/usr/bin/env node
const hre = require("hardhat");
const signer = require("./setup");
const safeMint = require("./safeMint");
const sleep = require("./sleep");

async function main() {
    /**
     * @dev make sure the first argument has the same name as your contract in the SoulBoundTest.sol file
     * @dev the second argument must be the message we want to set in the contract during the deployment process
     */
    await require("./displayHeader")();

    const signed = signer(process.env.PRIVATE_KEY);
    const contract = await hre.ethers.deployContract("SoulBoundTest", [`${signed.address}`]);

    await contract.waitForDeployment();

    console.log(`Monad contract deployed to ${contract.target} via address: ${signed.address}\n\n`.green);

    await safeMint(signed, contract.target);

    await sleep(1.5);
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});