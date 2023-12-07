import { ethers } from 'ethers';

var provider;
var signer;

const baseAPIURL = "https://wagmi-backend.up.railway.app/";

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
		const endPoint = "/createProfile";
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
	return data

};

// mint badge

