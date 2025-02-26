#!/usr/bin/env node
const { ethers, artifacts } = require("hardhat");
const { wallet, provider } = require("./setup")(process.env.PRIVATE_KEY);
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
        const contract = await(await (new ethers.ContractFactory(abi, bytecode, wallet)).deploy(wallet.address, {
            nounce: (await provider.getTransactionCount(wallet.address)) + 1
        })).waitForDeployment();

        console.log(`${(await provider.getNetwork()).name} contract ${i + 1} deployed to ${await contract.getAddress()} via address: ${wallet.address}\n\n`.blue);

        await safeMint(contract.safeMint, wallet, provider);
    }
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});