const express = require("express");
const { hexToBytes } = require("ethereum-cryptography/utils");
const { verifySigner } = require("./scripts/crypto");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "b7a921983823c0f9b5e59c19ad34a09102c0fb1a": 100,
  "31c643d9ab9fcfbce0207313ac4d3c27fb3e482c": 50,
  "d185f62cbbedd2477d1348b8dae147bfeeb0f742": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit, msgHash } = req.body;
  let signerVerified;

  // Catching Error: Cannot read properties of null (reading 'startsWith')
  // initially when verifySigner params are in their defaults.
  try {
    signerVerified = verifySigner(signature, recoveryBit, msgHash);
  } catch (error) {
    console.error(error);
  }

  if (!signerVerified){
    res.status(400).send({ message: "User not verified as the account owner"});
    //console.error("User not verified as the account owner");
    return;
  }


  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  }
  else if (amount <= 0){
    res.status(400).send({ message: "Invalid amount!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
