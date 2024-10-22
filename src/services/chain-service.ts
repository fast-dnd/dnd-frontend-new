const explorers: { [key: string]: string } = {
  Arbitrum: "https://arbiscan.io/tx/",
  ArbitrumSepoliaTestnet: "https://sepolia.arbiscan.io/tx/",
  Polygon: "https://polygonscan.com/tx/",
  Linea: "https://lineascan.build/tx/",
};

// Function to get the explorer URL based on the chain
const getExplorerUrl = (chain: string): string => {
  return explorers[chain] ? explorers[chain] : "";
};

const chainService = {
  getExplorerUrl,
};

export default chainService;
