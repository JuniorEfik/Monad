
module.exports = (async (safeMint, signer) => {
    //await ethers.getContractAt("SoulBoundTest", ADDRESS, signer)
    const tokenURI = "gateway.pinata.cloud/ipfs/bafkreialabmsuzygvkkedwsjrz5wq7np5onfnzn7ojg4l5awd2m6bipp7i"; // Replace with your desired token URI

    try {
        // Call safeMint function
        console.log(`Calling safeMint for address: ${signer.address}\n\n`.magenta);
        const tx = await safeMint(signer.address, tokenURI);
        await tx.wait();

        console.log(`Successfully minted SBT. Transaction hash: ${tx.hash}\n\n`.green);
    } catch (error) {
        console.error("\n\nError minting SBT:".red, error);
    }
});