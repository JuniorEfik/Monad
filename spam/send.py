import random
from web3 import Web3
from eth_account import Account
from concurrent.futures import ThreadPoolExecutor
from os import getenv
from dotenv import load_dotenv

load_dotenv()

PRIVATE_KEY = getenv("PRIVATE_KEY")
RPC_URL = getenv("RPC_ENDPOINT_URL")
TX = int(getenv("TX"))
CHAIN_ID = int(getenv("chainID"))

MIN_AMOUNT = 0.0000001
MAX_AMOUNT = 0.0000005

w3 = Web3(Web3.HTTPProvider(RPC_URL))
account = Account.from_key(PRIVATE_KEY)
signer_address = account.address

def get_gas_fee():
    print("⛽ Fetching current gas fees...")
    latest_block = w3.eth.get_block("latest")
    base_fee = latest_block.get("baseFeePerGas", w3.to_wei(30, "gwei"))  
    priority_fee = w3.eth.max_priority_fee  
    
    buffer = w3.to_wei(2, "gwei")  
    max_fee = base_fee + priority_fee + buffer 

    print(f"⛽ Gas fees fetched: Base Fee = {base_fee}, Priority Fee = {priority_fee}, Max Fee = {max_fee}")
    return {
        "base_fee": base_fee,
        "priority_fee": priority_fee,
        "max_fee": max_fee
    }

def prepare_transaction(to_address, amount, nonce, gas_fees):
    print(f"📝 Preparing transaction to {to_address} for {amount} Mon...")
    txn = {
        "to": to_address,
        "value": w3.to_wei(amount, "ether"),
        "gas": 21000,  # Fixed gas limit cus we are sending native Mon not tokens
        "maxFeePerGas": gas_fees["max_fee"],
        "maxPriorityFeePerGas": gas_fees["priority_fee"],
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "type": 2,  # EIP-1559 Transaction
    }
    signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
    print(f"✅ Transaction to {to_address} prepared.")
    return signed_txn

def send_batch_transactions(transactions):
    print(f"🚀 Sending {len(transactions)} transactions in a batch...")
    tx_hashes = []
    for signed_txn in transactions:
        try:
            tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
            tx_hashes.append(tx_hash.hex())
            print(f"✅ Sent transaction: {tx_hash.hex()}")
        except Exception as e:
            print(f"❌ Failed to send transaction: {str(e)}")
    return tx_hashes

def verify_transaction(tx_hash):
    print(f"🔍 Verifying transaction {tx_hash}...")
    try:
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
        if receipt.status == 1:
            print(f"✅ Transaction {tx_hash} was successful! Block: {receipt.blockNumber}")
            return True
        else:
            print(f"❌ Transaction {tx_hash} failed.")
            return False
    except Exception as e:
        print(f"❌ Error verifying transaction {tx_hash}: {str(e)}")
        return False

def random_wallets(num):
    return [w3.eth.account.create().address for _ in range(num)]

def initiate():
        gas_fees = get_gas_fee()
        nonce = w3.eth.get_transaction_count(signer_address) 
        print(f"🔢 Initial nonce: {nonce}")
        transactions = []
        with ThreadPoolExecutor() as executor:
            futures = []
            for to_address in random_wallets(TX):
                try:
                    checksum_address = w3.to_checksum_address(to_address)
                    if w3.is_address(checksum_address):
                        amount = round(random.uniform(MIN_AMOUNT, MAX_AMOUNT), 6)
                        futures.append(executor.submit(prepare_transaction, checksum_address, amount, nonce, gas_fees))
                        nonce += 1  # Increment nonce for the next transaction
                    else:
                        print(f"⚠️ Invalid address: {to_address}")
                except ValueError as e:
                    print(f"⚠️ Invalid address: {to_address} | Error: {str(e)}")
            for future in futures:
                transactions.append(future.result())

        # Send all transactions in a batch
        if transactions:
            print(f"🚀 Sending {len(transactions)} transactions in a batch...")
            tx_hashes = send_batch_transactions(transactions)
            
            print("🔍 Verifying transactions...")
            for tx_hash in tx_hashes:
                verify_transaction(tx_hash)

if __name__ == "__main__":
    print(f"🚀 Starting distribution from {signer_address}")
    initiate()