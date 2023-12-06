const { ethers, Wallet } = require('ethers');
require('dotenv').config();

// const privateKey = process.env.PRIVATE_KEY;
const privateKey = "4222eab5541962856ad0ae505df6dd1414936e77790a7a64ed3670ae076ea76a";
const wallet = new Wallet(privateKey);
const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/x66ngpknfweaoFrjMzdrIio3F3-YqUDV");
const signer = wallet.connect(provider);

const contractAddress = "0x740Be6A81b4208eA212AD9333dbAEa04507CC2F7";
const contractABI = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "createMedal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "request",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "registerInterest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "returnedId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]

const contract = new ethers.Contract(contractAddress, contractABI, signer);

// create medal
const createMedal = async() => {
    const deadline = 361000000;

    try {
        const TX = await contract.createMedal(deadline);
        const receipt = await TX.wait();
        console.log("created", receipt);
    } catch (error) {
        console.log(error);
    }
}

const getRequest = async() => {
    const request = await contract.request();
    console.log("created", request);
}

const registerInterest = async() => {
    try {
        const TX = await contract.registerInterest(0);
        const receipt = await TX.wait();
        console.log("registered", receipt);
    } catch (error) {
        console.log(error);
    }
}

const getId = async() => {
    const id = await contract.returnedId();
    console.log("converted", id);
}

const getBalance = async() => {
    const id = 0;
    const account = "0xdeDf26b9280620eaa52e0811bF7991a1B6aB077E";
    const balance = await contract.balanceOf(account, id);
    console.log("converted", balance);
}

// createMedal();
// getRequest();
registerInterest();
// getId();
// getBalance();