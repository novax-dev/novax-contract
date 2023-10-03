const { expect } = require("chai");
const { ethers } = require("hardhat");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");

describe("NovaXToken", () => {
    let novaXToken, owner, anotherAccount, attacker;

    beforeEach(async () => {
        [owner, anotherAccount, attacker] = await ethers.getSigners();
        const AnotherToken = await ethers.getContractFactory("NovaXToken", owner);
        //deploy contract token
        novaXToken = await AnotherToken.deploy(owner.address, 500);
    });

    it("should have the correct name", async () => {
        expect(await novaXToken.name()).to.equal("NovaX");
    });

    it("should have the correct symbol", async () => {
        expect(await novaXToken.symbol()).to.equal("NOVAX");
    });

    it("should have the correct decimals", async () => {
        expect(await novaXToken.decimals()).to.equal(18);
    });

    it("should have the correct initial balance for the owner", async () => {
        const totalOwnerBalance = await novaXToken.balanceOf(owner.address);
        const decimal = await novaXToken.decimals();
        expect(totalOwnerBalance / 10 ** decimal).to.equal(15_000_000);
    });

    it("should be able to transfer tokens", async () => {
        await novaXToken.connect(owner).transfer(anotherAccount.address, 100000000);
        const anotherAccountBalance = await novaXToken.balanceOf(anotherAccount.address);
        expect(anotherAccountBalance).to.equal(100000000);
    });

    it("should be burnable", async () => {
        await novaXToken.connect(owner).burn("1000000000000000000000000"); //100_000_000 * 10**18
        const totalSupply = await novaXToken.totalSupply();
        const totalOwnerBalance = await novaXToken.balanceOf(owner.address);
        const decimal = await novaXToken.decimals();
        expect(totalSupply / 10 ** decimal).to.equal(14000000);
        expect(totalOwnerBalance / 10 ** decimal).to.equal(14000000);
    });
});
