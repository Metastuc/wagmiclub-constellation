const hre = require("hardhat");

async function main() {

  const mumbaiRouter = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
  const uri = "uri";
  const builderAddress = "0x0aBcfc90f14B16192C172687b6d217b43fa971ce";
  const medals = await hre.ethers.deployContract("Medals", [mumbaiRouter, uri, builderAddress]);

  await medals.waitForDeployment();

  console.log( `deployed to ${medals.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// address = 0x43ca7Be2AD05a8c38b5f530291Bc758a678371b8