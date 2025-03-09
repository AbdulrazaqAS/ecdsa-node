import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';

function getAddress(publicKey){
	// In ethereum, the address is the last 20 bytes of the keccak hash
	// of the public key. The first byte of the public key indicates
	// compression or not, so it's removed.
	const address = keccak256(publicKey.slice(1)).slice(-20);
	//console.log("Address:", toHex(address));

	return toHex(address);
}

function hashMessage(msg){
	const messageBytes = utf8ToBytes(msg);
	const messageHash = toHex(keccak256(messageBytes));
	// console.log('Message Hash:', messageHash);
	return messageHash;
}

async function signMessageHash(msgHash, privateKey){
	// https://github.com/paulmillr/noble-secp256k1#utils
	const signature = await secp256k1.sign(msgHash, privateKey); // returns a Signature class obj
	//console.log('Signature:', signature.toCompactHex());

	return signature;
}

export {getAddress, hashMessage, signMessageHash};