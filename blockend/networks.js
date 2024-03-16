require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

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
  // scrollSepolia: {
  //   url: "https://sepolia-rpc.scroll.io",
  //   gasPrice: undefined,
  //   nonce: undefined,
  //   accounts,
  //   verifyApiKey: process.env.SCROLL_API_KEY || "UNSET",
  //   chainId: 534351,
  //   confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
  //   nativeCurrencySymbol: "ETH",
  // },
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
