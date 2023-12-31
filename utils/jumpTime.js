import { network } from "hardhat";

export const moveBlocks = async (amount) => {
  for (let i = 0; i < amount; i++) {
    await network.provider.request({
      method: "evm_mine",
      params: [],
    });
  }

  console.log(`Moved forward ${amount} blocks.`);
};

export const moveTime = async (seconds) => {
  await network.provider.send("evm_increaseTime", [seconds]);
  console.log(`Moved forward ${seconds} seconds.`);
};