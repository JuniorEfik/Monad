const sleep = require("./sleep");

module.exports = (async () => {
    process.stdout.write("\x1Bc");
    console.log("========================================".magenta);
    console.log("=          Monad Testnet Bot           =".magenta);
    console.log("=        Created by JuniorEfik         =".magenta);
    console.log("=       https://x.com/apokolipzz       =".magenta);
    console.log("========================================".magenta);
    console.log();
    return await sleep(1)
});