export type NetworkName =
  // | "Optimism"
  // | "Optimism Sepolia"
  "Arbitrum" | "ArbitrumSepoliaTestnet";
// | "Manta"
// | "Manta Sepolia Testnet"
// | "Linea"
// | "Base"
// | "Polygon";
// | "Mantle";

export const networkLogos: { [key in NetworkName]: string } = {
  // Ethereum: "/images/logos/ethereum-eth-logo.png",
  // "Ethereum Sepolia": "/images/logos/ethereum-eth-logo.png",
  // Optimism: "/images/logos/optimism-ethereum-op-logo.png",
  // "Optimism Sepolia": "/images/logos/optimism-ethereum-op-logo.png",
  Arbitrum: "/images/logos/arbitrum-arb-logo.png",
  ArbitrumSepoliaTestnet: "/images/logos/arbitrum-arb-logo.png",
  // Manta: "/images/logos/manta-logo.png",
  // "Manta Sepolia Testnet": "/images/logos/ethereum-eth-logo.png",
  // Linea: "/images/logos/linea-logo.png",
  // Base: "/images/logos/base-network-logo.png",
  // Polygon: "/images/logos/polygon-logo.png",
  // Mantle: "/images/logos/mantle-logo.png",
};

export const networks: Record<NetworkName, string> = {
  // Ethereum: "0xaa36a7", //0x1
  // "Ethereum Sepolia": "0xaa36a7",
  // Optimism: "0xa",
  // "Optimism Sepolia": "0xaa37dc",
  Arbitrum: "0x66eee", //"0xa4b1",
  ArbitrumSepoliaTestnet: "0x66eee",
  // Manta: "0xa9",
  // "Manta Sepolia Testnet": "0x34816e",
  // Linea: "0xe708",
  // Base: "0x2105",
  // Polygon: "0x89",
  // Mantle: "0x1388",
};

export const contractAddresses: { [key in NetworkName]: string } = {
  // Ethereum: "0x696c83111a49eBb94267ecf4DDF6E220D5A80129", //0x61423153f111BCFB28dd264aBA8d9b5C452228D2
  // "Ethereum Sepolia": "0x696c83111a49eBb94267ecf4DDF6E220D5A80129",
  // Optimism: "0xBC24514E541d5CBAAC1DD155187A171a593e5CF6",
  // "Optimism Sepolia": "0xf6919ebb1bFdD282c4edc386bFE3Dea1a1D8AC16",
  Arbitrum: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD", //0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD
  ArbitrumSepoliaTestnet: "0xBC24514E541d5CBAAC1DD155187A171a593e5CF6",
  // Manta: "0x523622DfEd0243B0DF80CC9275764B0f432D33E3",
  // "Manta Sepolia Testnet": "0x3bfD1Cc919bfeC7795b600E764aDa001b58f122a",
  // Linea: "0xb880D47D3894D99157B52A7F869aB3B1E2D4349d",
  // Base: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
  // Polygon: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
  // Mantle: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
};

export const oraAbi: any[] = [
  {
    inputs: [{ internalType: "contract IAIOracle", name: "_aiOracle", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "contract IAIOracle", name: "expected", type: "address" },
      { internalType: "contract IAIOracle", name: "found", type: "address" },
    ],
    name: "UnauthorizedCallbackSource",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "requestId", type: "uint256" },
      { indexed: false, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "modelId", type: "uint256" },
      { indexed: false, internalType: "string", name: "prompt", type: "string" },
    ],
    name: "promptRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "requestId", type: "uint256" },
      { indexed: false, internalType: "string", name: "output", type: "string" },
      { indexed: false, internalType: "bytes", name: "callbackData", type: "bytes" },
    ],
    name: "promptsUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "aiOracle",
    outputs: [{ internalType: "contract IAIOracle", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "requestId", type: "uint256" },
      { internalType: "bytes", name: "output", type: "bytes" },
      { internalType: "bytes", name: "callbackData", type: "bytes" },
    ],
    name: "aiOracleCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "modelId", type: "uint256" },
      { internalType: "string", name: "prompt", type: "string" },
    ],
    name: "calculateAIResult",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "callbackGasLimit",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "modelId", type: "uint256" }],
    name: "estimateFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "requestId", type: "uint256" }],
    name: "isFinalized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "requests",
    outputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "modelId", type: "uint256" },
      { internalType: "bytes", name: "input", type: "bytes" },
      { internalType: "bytes", name: "output", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "modelId", type: "uint256" },
      { internalType: "uint64", name: "gasLimit", type: "uint64" },
    ],
    name: "setCallbackGasLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
