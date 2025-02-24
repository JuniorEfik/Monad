module.exports = ((ms) => {
    // console.log(`Sleeping for ${ms} seconds...\n\n`)
    return new Promise(resolve => setTimeout(resolve, ms*1000));
})