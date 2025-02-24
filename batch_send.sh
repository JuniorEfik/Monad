#!/bin/bash

# Define the virtual environment directory
VENV_DIR="./spam/.venv"

# Check if the virtual environment exists
if [ ! -d "$VENV_DIR" ]; then
    echo "Virtual environment does not exist. Creating..."
    # Create the virtual environment
    python3 -m venv "$VENV_DIR"
    # Activate the virtual environment
    source "$VENV_DIR/bin/activate"
    echo "Installing necessary packages..."
    pip3 install web3 eth_account python-dotenv
else
    echo "..."
    source "$VENV_DIR/bin/activate"
fi



python3 spam/send.py