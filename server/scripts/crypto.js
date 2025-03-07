const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak")
const { getRandomBytesSync } = require('ethereum-cryptography/random');
const { toHex } = require("ethereum-cryptography/utils");

function getAddress(publicKey){
	// In ethereum, the address is the last 20 bytes of the keccak hash
	// of the public key. The first byte of the public key indicates
	// compression or not, so it's removed.
	const address = keccak256(publicKey.slice(1)).slice(-20);
	//console.log("Address:", toHex(address));

	return address;
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

module.exports = {generateRandomAccount, getAddress};