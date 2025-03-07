const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

accounts = [
  {
    privateKey: '5ac27dad168d26dfe5f2437f03f4cb44cef9f15cce20f2afba6517397f55f6b8',
    publicKey: '032d70c07c1a66698a954515bae8f248513ca7dc5e58b77f78a6ea4070aabc95c1',
    address: 'b7a921983823c0f9b5e59c19ad34a09102c0fb1a'
  },
  {
    privateKey: '5a396d84599e28d03a05054c658864f0631902b92f1f3659faee2be1c83e5ae6',
    publicKey: '0346d3088cabb62ed5111329fc4d4119376d404505858dd19fe059ae064b7475da',
    address: '31c643d9ab9fcfbce0207313ac4d3c27fb3e482c'
  },
  {
    privateKey: '2cd4bc1574ce3d998f91839e107c672fc8475fbf805c71dc6189735252674b92',
    publicKey: '037a2f26669b088c6708f16262e5e1a5461ae3b10a6b85643099fbc70dd7863c38',
    address: 'd185f62cbbedd2477d1348b8dae147bfeeb0f742'
  }
]

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
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
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
