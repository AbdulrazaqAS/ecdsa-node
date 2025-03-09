## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### private-key branch
This branch prompts users to enter their private key (don't try this in production). It is then used to sign a message that will be used by the server to verify the user and confirm the transfer transaction.

### Random Accounts Used
```
privateKey: '5ac27dad168d26dfe5f2437f03f4cb44cef9f15cce20f2afba6517397f55f6b8',
publicKey: '032d70c07c1a66698a954515bae8f248513ca7dc5e58b77f78a6ea4070aabc95c1',
address: 'b7a921983823c0f9b5e59c19ad34a09102c0fb1a'

privateKey: '5a396d84599e28d03a05054c658864f0631902b92f1f3659faee2be1c83e5ae6',
publicKey: '0346d3088cabb62ed5111329fc4d4119376d404505858dd19fe059ae064b7475da',
address: '31c643d9ab9fcfbce0207313ac4d3c27fb3e482c'

privateKey: '2cd4bc1574ce3d998f91839e107c672fc8475fbf805c71dc6189735252674b92',
publicKey: '037a2f26669b088c6708f16262e5e1a5461ae3b10a6b85643099fbc70dd7863c38',
address: 'd185f62cbbedd2477d1348b8dae147bfeeb0f742'
```

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4


### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
