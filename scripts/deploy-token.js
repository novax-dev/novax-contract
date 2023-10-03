const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const Contract = await hre.ethers.getContractFactory("NovaXToken");
    const myContract = await Contract.deploy(
        process.env.TAX_WALLET,
        process.env.TAX_FEE,
    );
    await myContract.deployed();
    console.log("NovaXToken deployed to address:", myContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
