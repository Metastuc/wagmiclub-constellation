# wagmiclub-constellation hack

> ## Table of Contents

-   [Project Details](#project-description)
-   [Problem Statement](#problem-statement)
-   [Solution](#solution)
-   [Technologies Used](#technologies-used)
    -   [Smart Contract](#solidity-smart-contracts)
    -   [Backend](#backend)
    -   [Chainlink](#Chainlink)
    -   [Moralis](#moralis)
    -   [Mumbai](#Mumbai-testnet)
#

> ## Technologies Used

| <b><u>Stack</u></b>      | <b><u>UsageSummary</u></b>                           |
| :----------------------- | :--------------------------------------------------- |
| **`Solidity`**           | Smart contract                                       |
| **`Node.js`**            | Backend/OffChain compute                             |
| **`Chainlink`**          | Automation, Functions and cross-chain minting        |
| **`Moralis`**            | Getting address onchain activity                     |
| **`Mumbai Chain`**       | Main contract deployed/performs call to other chains |

-   ### **Solidity smart contracts**

    The contracts can be found [here](https://github.com/Metastuc/wagmiclub-constellation/tree/main/smart-contracts)

    -   **Badges** This is an ERC1155 for issuing badges to users, each badge is represented by a new tokenId.
    -   **RequestBuilder** This contracts imports the FunctionsRequest contract to construct the functions request that will be used by the Medals contract to get the request that will be used to call the external API.
    -   **Medals** This is the main contract that utilizes chainlink functions and automation to mint a medal NFT represented by an tokenId. The contract gets off-chain data i.e the address to mint the medal NFT to from the backend and this
    process is automated with chainlink automation to run cron jobs on the contract. 
    <!-- -   <b style="color: orange">The two contracts communicate with each other through multichain-anycall protocol and are deployed on three different chains</b> -->
    -   **How to run** clone the repo, enter the smart contracts folder and download the npm packages by running:
    ```bash
    npm install
    # or
    yarn add
    ```
    configure the hardhat.config file(default set to mumbai) then deploy to any chain of choice of using the commands
    ```bash
    npx hardhat run --network <your-network> scripts/deployRequestBuilder.js
    npx hardhat run --network <your-network> scripts/deployMedals.js
    npx hardhat run --network <your-network> scripts/deployBadges.js
    ```

-   ### **Backend**

    -   <b style="color: orange">Node.js was the framework used for the backend</b>, we used the backend to call the Moralis API and to feed in the eligible addresses for medals to be minted.The backend was also used to handle storage of user information along with the firestore database. Public endpoints can be accessed [here](wagmi-backend.up.railway.app).
 
-   ### **Chainlink**
  -   **Automation**: Our project utilized Chainlink automation to run cron jobs for every 5 blocks on the Mumbai testnet to check the eligibility of medal participants. The medals contract was registered on the Chainlink upkeep Dapp and custom upkeep was used. It was used in the smart contract [here] ()
  -  **Functions**: Chainlink functions was used to retrive the eligible participants to a medal by calling the getEligible/${tokenId} endpoint. which returns a unit256 value which is the index of the address of the eligible participant in the array containing participants.
    
-   ### **Moralis**

    -   The Moralis API was used to fetch certain user onchain metrics like number of NFTs an account has and how much tokens an address has been transferred to an account example usage can be found[here]() and example API [here]()

-   ### **Mumbai-testnet**
    - All the contracts were deployed on mumbai.
