const WORLDCOIN_VERIFIER_ADDRESS = "0xb32e77dc18a4a6afdccbd58517f869a905e58ca8";
const APECOIN_SEPOLIA_ADDRESS = "0x01e61008f78a83e0dabd2fbd7ef81b64cdd2e1f4";
const LUFFY_REWARDS_CHILIZ_ADDRESS =
  "0x1c89e2970889cA2eA64078c9A87eBEd03D68a541";
const LUFFY_REWARDS_SEPOLIA_ADDRESS =
  "0x7dca30F5B6A23c5f6f0Da17b7EAb95Eda44a60b4";
const LUFFY_PROTOCOL_ADDRESS = "0x88854958eCE14EF7AC63AC684AAF19f7D9e84233";
const LUFFY_PROTOCOL_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_functionsRouter", type: "address" },
      { internalType: "contract IMailbox", name: "_mailbox", type: "address" },
      { internalType: "string[]", name: "_playersMetadata", type: "string[]" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "uint32", name: "destinationDomain", type: "uint32" },
      { internalType: "uint256", name: "requiredFee", type: "uint256" },
      { internalType: "uint256", name: "sentFee", type: "uint256" },
    ],
    name: "InadequateCrosschainFee",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "gameweek", type: "uint256" }],
    name: "InvalidGameweek",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "caller", type: "address" },
      { internalType: "address", name: "automationRegistry", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "NotAllowedCaller",
    type: "error",
  },
  { inputs: [], name: "OnlyRouterCanFulfill", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "gameweek", type: "uint256" }],
    name: "ResultsNotPublished",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "gameweek", type: "uint256" }],
    name: "SelectSquadDisabled",
    type: "error",
  },
  { inputs: [], name: "ZeroKnowledgeVerificationFailed", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "playersMetadataLength",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "playersMetadata",
        type: "string[]",
      },
    ],
    name: "PlayersMetadataUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "id", type: "bytes32" },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "id", type: "bytes32" },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      { indexed: false, internalType: "bytes", name: "error", type: "bytes" },
    ],
    name: "ResultsFetchFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "ResultsFetchInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "pointsMerkleRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "gameWeekResults",
        type: "string",
      },
    ],
    name: "ResultsPublished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isChilizOrApeCoin",
        type: "bool",
      },
    ],
    name: "RewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "squadHash",
        type: "bytes32",
      },
    ],
    name: "SquadRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "addressToNullifier",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_nullifierHash", type: "uint256" },
      { internalType: "uint256", name: "totalPoints", type: "uint256" },
      { internalType: "bytes", name: "_proof", type: "bytes" },
      { internalType: "bool", name: "isChilizOrApeCoin", type: "bool" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "", type: "bool" }],
    name: "destinationAddress",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "", type: "bool" }],
    name: "destinationChainIds",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "donId",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "functionsRouter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gameWeekResults",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "gameWeekToSquadHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameweekCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "requestId", type: "bytes32" },
      { internalType: "bytes", name: "response", type: "bytes" },
      { internalType: "bytes", name: "err", type: "bytes" },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isSelectSquadEnabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isZkVerificationEnabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mailbox",
    outputs: [{ internalType: "contract IMailbox", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "nulliferToAddresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "playerPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "playersMetadata",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "pointsMerkleRoot",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "_playersMetadata", type: "string[]" },
    ],
    name: "registerMorePlayers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_gameWeek", type: "uint256" },
      { internalType: "bytes32", name: "_squadHash", type: "bytes32" },
      { internalType: "address", name: "wrldCoinSignal", type: "address" },
      { internalType: "uint256", name: "wrldCoinNullifier", type: "uint256" },
    ],
    name: "registerSquad",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "request",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "requestToGameweek",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_callbackGasLimit",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastError",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastRequestId",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastResponse",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_subscriptionId",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendRequestCBOR",
    outputs: [{ internalType: "bytes32", name: "requestId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_upkeepContract", type: "address" },
    ],
    name: "setAutomationCronContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_gameweekCounter", type: "uint256" },
    ],
    name: "setGameweekCounter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_gameweek", type: "uint256" },
      { internalType: "bytes32", name: "_pointsMerkleRoot", type: "bytes32" },
    ],
    name: "setPointsMerkleRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bool", name: "_isSelectSquadEnabled", type: "bool" },
    ],
    name: "setSelectSquadEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bool", name: "_isZkVerificationEnabled", type: "bool" },
    ],
    name: "setZkVerificationEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32[2]",
        name: "_destinationChainIds",
        type: "uint32[2]",
      },
      {
        internalType: "bytes32[2]",
        name: "_destinationAddresses",
        type: "bytes32[2]",
      },
    ],
    name: "setupDestinationAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sourceCode",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_request", type: "bytes" },
      { internalType: "uint64", name: "_subscriptionId", type: "uint64" },
      { internalType: "uint32", name: "_gasLimit", type: "uint32" },
      { internalType: "bytes32", name: "_donID", type: "bytes32" },
    ],
    name: "updateRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upkeepContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zkVerifier",
    outputs: [
      { internalType: "contract UltraVerifier", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const LUFFY_REWARDS_ABI = [
  {
    inputs: [
      {
        internalType: "contract IMailbox",
        name: "_mailbox",
        type: "address",
      },
      {
        internalType: "string",
        name: "_rewardToken",
        type: "string",
      },
      {
        internalType: "contract IERC20",
        name: "_rewardTokenAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_protocolAddress",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
    ],
    name: "InvalidGameweek",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "InvalidTokenAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "caller",
        type: "bytes32",
      },
    ],
    name: "NotAllowedCaller",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "NotMailbox",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "TokenNotApproved",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameWeek",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameWeek",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "RewardsClaimed",
    type: "event",
  },
  {
    inputs: [],
    name: "REWARD_TOKEN",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameWeek",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nullifier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "betAmount",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameWeekCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "mailbox",
    outputs: [
      {
        internalType: "contract IMailbox",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playerToAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playerToBetAmounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playerToRewardAmounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameWeek",
        type: "uint256",
      },
    ],
    name: "setGameweekCounter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
];

const WORLDCOIN_VERIFIER_ABI = [
  {
    inputs: [
      {
        internalType: "contract IWorldID",
        name: "_worldId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_appId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_actionId",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidNullifier",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "WorldCoinSuccess",
    type: "event",
  },
  {
    inputs: [],
    name: "externalNullifierHash",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "groupId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nullifierHashes",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyAndExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "worldId",
    outputs: [
      {
        internalType: "contract IWorldID",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export {
  WORLDCOIN_VERIFIER_ADDRESS,
  APECOIN_SEPOLIA_ADDRESS,
  ERC20_ABI,
  WORLDCOIN_VERIFIER_ABI,
  LUFFY_REWARDS_CHILIZ_ADDRESS,
  LUFFY_REWARDS_SEPOLIA_ADDRESS,
  LUFFY_REWARDS_ABI,
  LUFFY_PROTOCOL_ABI,
  LUFFY_PROTOCOL_ADDRESS,
};
