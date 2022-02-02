const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "moment trial salmon skate enact misery toe dust goat harvest achieve place",
  "https://rinkeby.infura.io/v3/d254eae4d89c4a539c9d5a70c17a296e"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`Attempting to deploy from account ${accounts[0]}`);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hey!!"],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(`Contract deployed to ${result.options.address}`);
  provider.engine.stop();
};

deploy();
