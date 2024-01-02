import "@typechain/hardhat";
import "hardhat-deploy";
// import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-waffle";



const config = {
  defaultNetwork: "hardhat",
  networks: {
    // DEVELOPMENT BLOCKCHAINS
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;