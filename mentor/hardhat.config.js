require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts", // Ensure this is correct
  },
  networks: {
    amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/Ox9kOCEogP83THRCh1h5enzcSOjpnElQ",
      accounts: [
        // Replace with your actual private key as a string
        process.env.PRIVATE_KEY || "your_private_key_here"
      ],
      chainId: 80002
    }
  }
};