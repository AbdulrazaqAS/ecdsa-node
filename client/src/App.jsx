import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState(""); // TODO: Is privateKey needed?
  
  const [signature, setSignature] = useState(null);
  const [msgHash, setMsgHash] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setSignature={setSignature}
        setMsgHash={setMsgHash}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        signature={signature}
        msgHash={msgHash}
      />
    </div>
  );
}

export default App;
