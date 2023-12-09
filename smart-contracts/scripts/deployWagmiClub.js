const hre = require("hardhat");

async function main() {

  const name = "WagmiClub";
  const symbol = "WGM";
  const wagmi = await hre.ethers.deployContract("WagmiClub", [name, symbol]);

  await wagmi.waitForDeployment();

  console.log( `deployed to ${wagmi.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// address = 0x03069f9B928A5Ccf589C5C19ba4bD0599ea0861f