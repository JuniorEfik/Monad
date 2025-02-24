# Monad

### Clone the repo
```bash
git clone https://github.com/JuniorEfik/Monad.git 
```

### Move to the directory and create an .env file
```bash
cd Monad && nano .env
```
### Populate it with:
* PRIVATE_KEY= # Your private key
* TX= # no of transactions for batch sending

### These ones should be copied and pasted accordingly into the previously created .env file
```bash
RPC_ENDPOINT_URL="https://testnet-rpc.monad.xyz"
RPC_EXPLORER="https://testnet.monadexplorer.com/tx/"
chainID="10143"
```

### Set each files to executable using the commands below:
```bash
chmod +x batch_send.sh
chmod +x deploy.sh 
```

# To batch send to random addresses, use command:
```bash
./batch_send.sh
```

# to mint random nfts
```bash
./mint.sh
```