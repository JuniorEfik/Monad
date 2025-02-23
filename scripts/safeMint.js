const { ethers } = require("hardhat");

module.exports = (async (signer, ADDRESS) => {
    // Contract instance
    const soulBoundTest = await ethers.getContractAt("SoulBoundTest", ADDRESS, signer)
    // Parameters for safeMint
    const toAddress = signer.address; // Mint to the deployer's address
    const tokenURI = "gateway.pinata.cloud/ipfs/bafkreialabmsuzygvkkedwsjrz5wq7np5onfnzn7ojg4l5awd2m6bipp7i"; // Replace with your desired token URI

    try {
        // Call safeMint function
        console.log("\n\nCalling safeMint...");
        const tx = await soulBoundTest.safeMint(toAddress, tokenURI);
        await tx.wait();

        console.log(`\n\nSuccessfully minted SBT. Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("\n\nError minting SBT:", error);
    }
});