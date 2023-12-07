const hre = require("hardhat");

async function main() {

  const uri = "Wagmi Club";

  const badges = await hre.ethers.deployContract("Badge", [uri]);

  await badges.waitForDeployment();

  console.log( `deployed to ${badges.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// deployed to 0xCfD0BC91213D1351514f0436E2FEd65850DFBc59