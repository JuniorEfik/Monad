#!/usr/bin/env node
const { ethers, artifacts } = require("hardhat");
const wallet = require("./setup")(process.env.PRIVATE_KEY);
const safeMint = require("./safeMint");
const sleep = require("./sleep");

async function main() {
    /**
     * @dev make sure the first argument has the same name as your contract in the SoulBoundTest.sol file
     * @dev the second argument must be the message we want to set in the contract during the deployment process
     */
    const { abi, bytecode } = await artifacts.readArtifact("SoulBoundTest");

    await require("./displayHeader")();

    for (let i = 0; i < process.env.TX; i++) {
        const contract = await (new ethers.ContractFactory(abi, bytecode, wallet)).deploy(wallet.address);
        console.log(`Monad contract ${i+1} deployed to ${await contract.getAddress()} via address: ${wallet.address}\n\n`.blue);

        await sleep(2.5);

        await safeMint(contract.safeMint, wallet);
    }
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});