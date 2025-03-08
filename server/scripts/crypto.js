const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak")
const { getRandomBytesSync } = require('ethereum-cryptography/random');
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function getAddress(publicKey){
	// In ethereum, the address is the last 20 bytes of the keccak hash
	// of the public key. The first byte of the public key indicates
	// compression or not, so it's removed.
	const address = keccak256(publicKey.slice(1)).slice(-20);
	//console.log("Address:", toHex(address));

	return toHex(address);
}

function generateRandomAccount(){
	const privateKey = getRandomBytesSync(32);  // 32 bytes (256-bit)
	//console.log("Private Key Byte Array:", privateKey);
	//console.log("Private Key Hex:", toHex(privateKey));

	const publicKey = secp256k1.getPublicKey(privateKey);
	//console.log('Public Key:', toHex(publicKey));

	const address = getAddress(publicKey);

	return {
			privateKey: toHex(privateKey),
			publicKey: toHex(publicKey),
			address: toHex(address)
			};
}

function hashMessage(msg){
	const messageBytes = utf8ToBytes(msg);
	const messageHash = toHex(keccak256(messageBytes));
	//console.log('Message Hash:', messageHash);
	return messageHash;
}

function signMessageHash(msgHash, privateKey){
	// https://github.com/paulmillr/noble-secp256k1#utils
	const signature = secp256k1.sign(msgHash, privateKey); // returns a Signature class obj
	//console.log('Signature:', signature.toCompactHex());

	return signature;
}

// signature: hex, msgHash: hex
function verifySigner(signature, recoveryBit, msgHash){
	// https://github.com/paulmillr/noble-secp256k1#utils

	const _signatureObj = secp256k1.Signature.fromCompact(signature); // recovery bit is undefined here
	//console.log("secp256k1.Signature.fromCompact:", _signatureObj)
	
	const signatureObj = new secp256k1.Signature(_signatureObj.r, _signatureObj.s, recoveryBit);  // new Signature passing recoveryBit
	//console.log("new secp256k1.Signature:", signatureObj)
	
	const publicKey = signatureObj.recoverPublicKey(msgHash).toHex();  // recoverPubKey returns ProjectivePoint obj
	const isValid = secp256k1.verify(signatureObj, msgHash, publicKey);
	//console.log('Is signature valid?', isValid);

	return isValid;
}


/*
A byte is 8 bits.
One hex character represents 4 bits (also called a nibble).
So, 2 hex characters = 8 bits = 1 byte.

A typical Ethereum signature (65 bytes) is 130 chars in hex:
65 bytes * 2 hex chars per byte = 130 hex characters
0x [r (64 chars)] [s (64 chars)] [v (2 chars)]
That's exactly 130 hex characters (or 132 if counting 0x).
*/
async function test (){
	const msg = "AM the one";
	const msgHash = hashMessage(msg);
	const signed = signMessageHash(msgHash, "5a396d84599e28d03a05054c658864f0631902b92f1f3659faee2be1c83e5ae6"); // 2nd acct from README
	const recoveryBit = signed.recovery
	console.log(signed)
	console.log(signed.toCompactHex()) // Recovery bit not included (128 hex chars: 64 bytes)
	console.log(signed.toCompactRawBytes())  // Recovery bit not included (64 bytes)
	console.log("\n")

	// Converting to hex and not directly using the Signature obj because while adding the Signature
	// obj to an Object to be passed from client to server, is says it can't serialize that. But it can
	// serialize hex string. Using the Signature obj directly won't require recoveryBit bcoz it is already
	// in the Signature.
	const verify = verifySigner(signed.toCompactHex(), recoveryBit, msgHash);
	console.log(verify);
}

// Also uncomment verifySigner commented lines if testing
// test().then();

module.exports = {generateRandomAccount, getAddress, hashMessage, signMessageHash, verifySigner};

