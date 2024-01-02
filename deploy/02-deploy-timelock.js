import { EXECUTORS, MIN_DELAY, PROPOSERS } from "../hardhat-helper-config";

const deployTimeLock = async (hre) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying the TimeLock contract...");
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, PROPOSERS, EXECUTORS],
    log: true,
    // waitConfirmations: 1,
  });

  log(`02-Deployed 'TimeLock' at ${timeLock.address}`);
};

export default deployTimeLock;
deployTimeLock.tags = ["all", "timelock"];