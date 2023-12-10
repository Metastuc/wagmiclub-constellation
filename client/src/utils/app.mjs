import { ethers } from 'ethers';
var provider;
var signer;
var userProfile;

const baseAPIURL = "https://wagmi-backend.up.railway.app/";

const badgeContractAddress = "0xCfD0BC91213D1351514f0436E2FEd65850DFBc59";
const badgeABI = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const medalContractAddress = "0x5Da8DFd3c344Dd960A8956973591d21cC2209e33"
const medalABI = [
	{
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
	  }
]

export const connectWallet = async () => {
	try { 
		if (window.ethereum) {
			provider = new ethers.BrowserProvider(window.ethereum);
			const currentNetwork = await provider.getNetwork();
			const _currentNetworkId = currentNetwork.chainId;
			const currentNetworkId = Number(_currentNetworkId);
			if (currentNetworkId === 0x13881) {
				// checking if the network is available on the wallet
				await provider.send("eth_requestAccounts", []);
				signer = await provider.getSigner();
			} else {
				const switchMumbai = {
					chainId: "0x13881",
				};
				try {
					await ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [{ chainId: "0x13881" }],
					});
					await provider.send("eth_requestAccounts", []);
					signer = await provider.getSigner();
				} catch (switchError) {
					if (switchError.code === 4902) {
						try {
							await ethereum.request({
								method: "wallet_addEthereumChain",
								params: [
									{
										chainId: "0x13881",
										chainName: "Mumbai testnet",
										rpcUrls: [
											"https://rpc-mumbai.maticvigil.com/",
										],
									},
								],
							});
							await ethereum.request({
								method: "wallet_switchEthereumChain",
								params: [{ chainId: "0x13881" }],
							});
							await provider.send("eth_requestAccounts", []);
							signer = await provider.getSigner();
						} catch (error) {
							console.log(error);
						}
					} else {
						console.log(switchError);
					}
				}
				await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: '0x13881' }],
				});
			}
		} else {
			return "No wallet installed";
		}
	} catch (error) {
		console.error(error);
	}
};

export const getUserAddress = async () => {
	const address = await signer.getAddress();
	console.log(address);
	return address;
};

export const logIn = async () => {
	await connectWallet();
	const address = await getUserAddress();
	try {
		const response = await fetch(`${baseAPIURL}checkUser/${address}`);

		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
	
		const res = await response.json();
		const exists = res.exists;

		if (exists == true) {
			console.log('true');
			return true;
		} else {
			await getProfile();
			console.log('false');
			return false;
		}
	} catch (error) {
		console.log(error);
		console.log("not working");
	}
};

// sign up
export const signUp = async (profileRequestBody) => {
	try {
		await connectWallet();
		const address = await getUserAddress();
		profileRequestBody['address'] = address;
		// call create function to API with details
		const endPoint = "createProfile";
		const createProfileEndpoint = baseAPIURL + endPoint;
		const response = await fetch(createProfileEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(profileRequestBody),
		});
		// return API endpoint with userName
		// pass it into the universal profile deploy and deploy UP
		if (!response.ok) {
			throw new Error("Network error");
		}

		console.log("created");

	} catch (error) {
		console.log(error);
	}
};

// function to sign up
export const signIn = async () => {
	await connectWallet();
	const userAddress = await getUserAddress();

	const response = await fetch(`${baseAPIURL}/getUserProfileAddress/${userAddress}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
	return data;

};

// upload image
export const uploadImage = async (image) => {
	try {

		const formData = new FormData();
		formData.append('file', image);
	

		// call upload function to API with details
		const endPoint = "/uploadImage";

		// const uploadEndpoint = baseAPIURL + endPoint;
		const uploadEndpoint = "http://localhost:3300" + endPoint;

		const response = await fetch(uploadEndpoint, {
			method: 'POST',
			body: formData
		});
	
		if (!response.ok) {
			throw new Error('Server Error');
		}
	
		const data = await response.json();

		console.log("File uploaded succesfully", data);
		return data.url;
	
	} catch (error) {
		console.log(error);
	}
}

// mint badge
export const mintBadge = async (mintBody) => {
	try {

		await connectWallet();
		const minter = await getUserAddress();

		const image = mintBody.image;
		const url = await uploadImage(image);
		mintBody.image = url;

		mintBody.minter = minter;

		// call mint function to API with details
		const endPoint = "mintBadge";

		const mintBadgeEndpoint = baseAPIURL + endPoint;

		const response = await fetch(mintBadgeEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(mintBody),
		});

		if (!response.ok) {
			throw new Error('Server Error');
		}
	
		const data = await response.json();

		const contract = new ethers.Contract(badgeContractAddress, badgeABI, signer);
		const TX = await contract.mint(mintBody.receiver);
        const receipt = await TX.wait();
        console.log("created", receipt);
	
		console.log("Minted Successfully", data.response, receipt);
	} catch (error) {
		console.log(error);
	}
}

function getNumber(inputString) {
	const numberRegex = /\d+(\.\d+)?/; // Regular expression to match numbers
	const match = inputString.match(numberRegex); // Search for the number in the input string
  
	if (match) {
	  return parseFloat(match[0]); // Parse the matched number and return it as a float
	} else {
	  return null; // Return null if no number is found in the string
	}
  }

function getType(input) {
switch (input) {
	case 'Top Nft collector':
	return 0;
	case 'Donator':
	return 1;
	case 'Liquidity provider':
	return 2;
	case 'Trading expert':
	return 3;
	case 'Bug hunter':
	return 4;
	default:
	return 0; // Return -1 if the input doesn't match any specified type
}
}

// create medal 
export const createMedal = async (createBody) => {
	try {

		await connectWallet();
		const creator = await getUserAddress();

		const image = createBody.image;
		const url = await uploadImage(image);

		const body = { image: url };
		body.additionalInfo = createBody.additionalInfo;
		body.contractAddress = createBody.address;
		body.chain = createBody.deployChain;
		body.creator = creator;
		body.index = 0;
		body.type = getType(createBody.type);
		body.alphaType = createBody.type;
		body.title = createBody.title;
		body.validator = createBody.validator;
		body.minters = [];

		body.requirement = getNumber(createBody.metrics);

		// call mint function to API with details
		const endPoint = "createMedal";

		const createMedalEndpoint = baseAPIURL + endPoint;

		const response = await fetch(createMedalEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Server Error');
		}
	
		const data = await response.json();

		const contract = new ethers.Contract(medalContractAddress, medalABI, signer);
		const blockNumber = await provider.getBlockNumber();
		const deadline = blockNumber + 66461;
		const TX = await contract.createMedal(deadline);
        const receipt = await TX.wait();
        console.log("created", receipt);
	
		console.log("Minted Successfully", data.response, receipt);
	} catch (error) {
		console.log(error);
	}
}

// participate
export const particpate = async (id) => {
	try {
		await connectWallet();
		const address = await getUserAddress();

		body.requirement = getNumber(createBody.metrics);

		// call mint function to API with details
		const endPoint = `/particapate/${id}`;

		// const participateEndpoint = baseAPIURL + endPoint;
		const participateEndpoint = "http://localhost:3300" + endPoint;

		const response = await fetch(participateEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ address: address }),
		});

		if (!response.ok) {
			throw new Error('Server Error');
		}
	
		const data = await response.json();

		const contract = new ethers.Contract(medalContractAddress, medalABI, signer);
		const TX = await contract.registerInterest(id);
        const receipt = await TX.wait();
        console.log("registered", receipt);
	
		console.log("registered Successfully", data.response, receipt);
	} catch (error) {
		console.log(error);
	}
}

export const getProfile = async() => {
	await connectWallet();
	const address = await getUserAddress();

	try {
		const endPoint = `getUserProfileAddress/${address}`;

		const getProfileEndpoint = baseAPIURL + endPoint;

		const response = await fetch(getProfileEndpoint, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error('Server Error');
		}

		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const returnProfile = () => {
	return {userProfile}
}