const hre = require("hardhat");

async function main() {

  const mumbaiRouter = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
  const uri = "uri";
  const builderAddress = "0x4889c1DE5173b5634C9443847eE8F4CA5315aDa9";
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

// address = 0x5Da8DFd3c344Dd960A8956973591d21cC2209e33