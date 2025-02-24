npm install && npx hardhat compile

echo "How many times do you want to deploy and mint? "

read nn

if [[ $nn =~ ^[0-9]+$ ]]; then
    for((i=1; i<=$nn; i++)); do
        echo "Running iteration $i"
        npm run deploy
    done
    echo "Completed"
else
    echo "Invalid input. Please enter a number."
fi

