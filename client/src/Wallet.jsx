import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { getAddress, hashMessage, signMessageHash } from "./scripts/crypto"

// TODO: Is setPrivateKey needed here.
function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, setSignature, setMsgHash}) {
  const message = "Just do it. It is intentional transfer";

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    let publicKey, address;

    // Catching Error: invalid private key, expected hex or 32 bytes, got string.
    // Raise while user didn't finish typing private key.
    try{      
      publicKey = secp256k1.getPublicKey(privateKey);
      address = getAddress(publicKey);

      const msgHash = hashMessage(message);
      const signature = await signMessageHash(msgHash, privateKey);

      setAddress(address);
      setSignature(signature);
      setMsgHash(msgHash);

    } catch (error) {
      setAddress("");
      console.error(error);
    }

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);

      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Paste your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
