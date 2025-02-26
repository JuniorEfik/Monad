module.exports = (async (safeMint, wallet, provider) => {
    //await ethers.getContractAt("SoulBoundTest", ADDRESS, wallet)
    const tokenURI = "gateway.pinata.cloud/ipfs/bafkreialabmsuzygvkkedwsjrz5wq7np5onfnzn7ojg4l5awd2m6bipp7i"; // Replace with your desired token URI

    try {
        // Call safeMint function
        console.log(`Calling safeMint for address ${wallet.address}\n\n`.magenta);
        const tx = await safeMint(wallet.address, tokenURI, {
            nounce: (await provider.getTransactionCount(wallet.address)) + 1
        });

        await tx.wait();

        console.log(`Successfully minted SBT. Transaction link: ${process.env.RPC_EXPLORER}/tx/${tx.hash}\n\n`.green);
    }
    catch (error) {
        console.error("\n\nError minting SBT:".red, error);
    }
});