# wagmiclub-constellation hack

> ## Table of Contents

-   [Project Details](#project-description)
-   [Problem Statement](#problem-statement)
-   [Solution](#solution)
-   [Technologies Used](#technologies-used)
    -   [Moralis](#moralis)
    -   [Multichain Anycall](#multichain-anycall)
    -   [Binance](#binance-testnet)
    -   [Smart Contract](#solidity-smart-contracts)
    -   [Fantom](#fantom-testnet)
-   [Important Live Links](#importantlive-hosted-project-links)
-   [Team Members](#contributors)
-   [Project Features](#project-features)
-   [Why Conserv](#why-conserv)
-   [Features We Couldn't Complete](#features-we-couldnt-complete)
-   [Future Project Plans](#future-project-plans)

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

    Conserve makes use of two smart contracts see [2 contracts](hhttps://github.com/Godhanded/crosschain_insure/tree/main/contracts)

    -   **DefiInsure** The main or home contract through which calls to other chains are made possible
    -   **CDefiInsure** the same contract but with an execute function which is called by another contract from a different chain to peform an internal contract call
    -   <b style="color: orange">The two contracts communicate with each other through multichain-anycall protocol and are deployed on three different chains</b>

-   ### **Multichain Anycall**

    -   <b style="color: orange">The multichain-anycall protocol is phenominal</b>, we used it to perform crosschain functions like call our withdraw function on our three contracts deployed on three different chains(BINANCE, FTM) see [code here](https://github.com/Godhanded/crosschain_insure/blob/main/contracts/insure.sol#L78) and [here](https://github.com/Godhanded/crosschain_insure/blob/main/contracts/calledContracts/cinsure.sol#L62)

-   ### **Moralis**

    -   The Moralis vanilla js SDK was used in this project for all smart contract calls, see [one of the functions](https://github.com/Godhanded/crosschain_insure/blob/main/frontend/js/script.js)

    -   Moralis was also used to connect and communicate with A web3 provider like Metamask. see [handleAuth function](https://github.com/Godhanded/crosschain_insure/blob/main/frontend/js/script.js#L25)

-   ### **Binance Testnet**

    -   The contract on this chain was used as <b style="color: orange">the Home or main </b>through which calls to two other chains can be made, The contract was deployed and verified, see [Contract here](https://testnet.bscscan.com/address/0xeFf5D7c9ea237a0Ad814AB5FF07eE9805B837F13#code)

-   ### **Fantom Testnet**

    -   <b style="color: orange">A crosschain enabled</b> smart contract was deployed and Verified on the FTM Test net
        see [Contract here](https://testnet.ftmscan.com/address/0x1d94b4efe2310157dcd84a1f8a95cc8e6cea29a9#code)

    -   insurance is payed by calling the payInsurance function on the contract
