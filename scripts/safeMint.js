const { ethers } = require("hardhat");

module.exports = (async (signer, ADDRESS) => {
    // Contract instance
    const soulBoundTest = await ethers.getContractAt("SoulBoundTest", ADDRESS, signer)
    // Parameters for safeMint
    const tokenURI = "gateway.pinata.cloud/ipfs/bafkreialabmsuzygvkkedwsjrz5wq7np5onfnzn7ojg4l5awd2m6bipp7i"; // Replace with your desired token URI

    try {
        // Call safeMint function
        console.log(`Calling safeMint... for address: ${signer.address}\n\n`.magenta);
        const tx = await soulBoundTest.safeMint(signer.address, tokenURI);
        await tx.wait();

        console.log(`Successfully minted SBT. Transaction hash: ${tx.hash}\n\n`.green);
    } catch (error) {
        console.error("\n\nError minting SBT:".red, error);
    }
});