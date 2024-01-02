import { ethers, network } from "hardhat";
import {
  developmentChains,
  VOTING_DELAY,
  PROPOSAL_FILE,
  FUNC_ARGS,
  FUNC,
  DESCRIPTION,
} from "../hardhat-helper-config";
import * as fs from "fs";
import { moveBlocks } from "../utils/timetravel";

export async function makeProposal(
  functionToCall,
  args,
  proposalDescription
) {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box");

  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );

  console.log("Function to call: ", functionToCall);
  console.log("Args: ", args);
  console.log("Encoded Function Call: ", encodedFunctionCall);
  console.log("Proposal Description: ", proposalDescription);

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  );

  const proposeReceipt = await proposeTx.wait(1);

  // Speed up time so we can vote!
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }

  const proposalId = proposeReceipt.events[0].args.proposalId;
  const chainId = network.config && network.config.chainId ? network.config.chainId.toString() : '';

  fs.writeFileSync(
    PROPOSAL_FILE,
    JSON.stringify({
      [chainId]: [proposalId.toString()],
    })
  );

  const proposalState = await governor.state(proposalId);
  // The state of the proposal. 1 is not passed. 0 is passed.
  console.log(`Current Proposal State: ${proposalState}`);
}

makeProposal(FUNC, [FUNC_ARGS], DESCRIPTION)
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });