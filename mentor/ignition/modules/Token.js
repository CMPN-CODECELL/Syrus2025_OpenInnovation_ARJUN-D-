const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployModule = buildModule('TokenModule', (m) => {
  const mentorDAO = m.contract("MentorDAO"); // Ensure this matches your Solidity contract name
  return { mentorDAO };
});

module.exports = DeployModule;
