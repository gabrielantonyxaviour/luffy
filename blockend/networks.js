require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 5;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}
if (SECOND_PRIVATE_KEY) {
  accounts.push(SECOND_PRIVATE_KEY);
}

const networks = {
  arbitrumSepolia: {
    url:
      "https://arb-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_ARBITRUM,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ARBISCAN_API_KEY || "UNSET",
    chainId: 421614,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
  },
  chilizSpicy: {
    url: "https://spicy-rpc.chiliz.com/",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: "fksnfjksn",
    chainId: 88882,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "CHZ",
  },
  ethereumSepolia: {
    url: process.env.SEPOLIA_RPC_URL || "UNSET",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ETHERSCAN_API_KEY || "UNSET",
    chainId: 11155111,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
  },
};

module.exports = {
  networks,
};
