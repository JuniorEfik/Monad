# Monad

### Clone the repo
```bash
git clone https://github.com/JuniorEfik/Monad.git 
```

### Create an .env file in the root directory and populated it with:
* PRIVATE_KEY= # Your private key
* TX= # no of transactions for batch sending

### The ones below should be copied and pasted accordingly
```bash
RPC_ENDPOINT_URL="https://testnet-rpc.monad.xyz"
RPC_EXPLORER="https://testnet.monadexplorer.com/tx/"
chainID="10143"
```

### set each files to executable using the commands below:
```bash
chmod +x batch_send.sh
chmod +x deploy.sh 
```

# to batch_send to random address, use command:
```bash
./batch_send.sh
```

# to mint random nfts
```bash
./mint.sh
```