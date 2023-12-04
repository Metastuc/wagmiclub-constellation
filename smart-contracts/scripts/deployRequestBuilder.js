const hre = require("hardhat");

async function main() {

  const requestBuilder = await hre.ethers.deployContract("requestBuilder");

  await requestBuilder.waitForDeployment();

  console.log( `deployed to ${requestBuilder.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// address = 0x0aBcfc90f14B16192C172687b6d217b43fa971ce