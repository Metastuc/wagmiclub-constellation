const hre = require("hardhat");

async function main() {

  const mumbaiRouter = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
  const uri = "uri";
  const builderAddress = "0xc208129C1F7c4a96cbdae1DE723e70a8BbA26CE8";
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

// address = 0x1d27b0D024BFd7eF3fBb2007e281877679989b81