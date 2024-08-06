/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from "react";
import { TransactionFactory } from "@ethereumjs/tx";
import { Gift } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import bs58 from "bs58";
import { AiOutlineClose } from "react-icons/ai";
import Web3 from "web3";

import { Button } from "@/components/ui/button";
import oraService from "@/services/ora-network-service";
import { jibril } from "@/utils/fonts";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

const OraNetworkModal = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | "">("");

  const handleNetworkSelection = (network: NetworkName) => {
    setSelectedNetwork(network);
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="max-lg:hidden">
        <button className="flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black p-4 transition-all duration-200 hover:bg-[#1B1B1B]">
          <Gift size={32} />
        </button>
      </DialogTrigger>
      <DialogTrigger asChild className="lg:hidden">
        <Button className="gap-4 py-4" variant="sidebar">
          <Gift className="size-5 shrink-0 fill-white" />
          <p className="flex-1 text-center">claim reward</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-lg uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              Participate in ORA network Leaderboard
            </p>
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
          </div>
          <br />
          <br />
          <p className="ml-2 text-center font-light lg:text-xl lg:tracking-[1.5px]">
            By selecting network and executing transaction given transcript will be evaulated by AI
            Judge and depending on its rating you will climb ORA network leaderboard !
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {Object.entries(networks).map(([name, id]) => (
              <NetworkButton
                networkName={name as NetworkName}
                onClick={() => handleNetworkSelection(name as NetworkName)}
                networkLogos={networkLogos}
                isSelected={selectedNetwork === name}
              />
            ))}
          </div>
          <Button
            onClick={() => handleOraNetworkClick(selectedNetwork)}
            className="hover:bg-primary-dark bg-primary"
            disabled={!selectedNetwork}
          >
            Pay to Compete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type NetworkName =
  | "Ethereum"
  // | "Ethereum Sepolia"
  | "Optimism"
  // | "Optimism Sepolia"
  | "Arbitrum"
  // | "Arbitrum Sepolia Testnet"
  | "Manta"
  // | "Manta Sepolia Testnet"
  | "Linea"
  | "Base"
  | "Polygon"
  | "Mantle";

const networkLogos: { [key in NetworkName]: string } = {
  Ethereum: "/images/logos/ethereum-eth-logo.png",
  // "Ethereum Sepolia": "/images/logos/ethereum-eth-logo.png",
  Optimism: "/images/logos/optimism-ethereum-op-logo.png",
  // "Optimism Sepolia": "/images/logos/optimism-ethereum-op-logo.png",
  Arbitrum: "/images/logos/arbitrum-arb-logo.png",
  // "Arbitrum Sepolia Testnet": "/images/logos/ethereum-eth-logo.png",
  Manta: "/images/logos/manta-logo.png",
  // "Manta Sepolia Testnet": "/images/logos/ethereum-eth-logo.png",
  Linea: "/images/logos/linea-logo.png",
  Base: "/images/logos/base-network-logo.png",
  Polygon: "/images/logos/polygon-logo.png",
  Mantle: "/images/logos/mantle-logo.png",
};
const networks: Record<NetworkName, string> = {
  Ethereum: "0x1",
  // "Ethereum Sepolia": "0xaa36a7",
  Optimism: "0xa",
  // "Optimism Sepolia": "0xaa37dc",
  Arbitrum: "0xa4b1",
  // "Arbitrum Sepolia Testnet": "0x66eee",
  Manta: "0xa9",
  // "Manta Sepolia Testnet": "0x34816e",
  Linea: "0xe708",
  Base: "0x2105",
  Polygon: "0x89",
  Mantle: "0x1388",
};

const contractAddresses: { [key in NetworkName]: string } = {
  Ethereum: "0x61423153f111BCFB28dd264aBA8d9b5C452228D2",
  // "Ethereum Sepolia": "0x696c83111a49eBb94267ecf4DDF6E220D5A80129",
  Optimism: "0xBC24514E541d5CBAAC1DD155187A171a593e5CF6",
  // "Optimism Sepolia": "0xf6919ebb1bFdD282c4edc386bFE3Dea1a1D8AC16",
  Arbitrum: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
  // "Arbitrum Sepolia Testnet": "0xBC24514E541d5CBAAC1DD155187A171a593e5CF6",
  Manta: "0x523622DfEd0243B0DF80CC9275764B0f432D33E3",
  // "Manta Sepolia Testnet": "0x3bfD1Cc919bfeC7795b600E764aDa001b58f122a",
  Linea: "0xb880D47D3894D99157B52A7F869aB3B1E2D4349d",
  Base: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
  Polygon: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
  Mantle: "0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD",
};

interface NetworkButtonProps {
  networkName: NetworkName;
  onClick: (networkName: NetworkName) => void;
  networkLogos: { [key: string]: string };
  isSelected: boolean;
}

const NetworkButton: React.FC<NetworkButtonProps> = ({ networkName, onClick, isSelected }) => {
  const selectedClass = isSelected ? "ring-4 ring-primary-light" : "";
  return (
    <div className={`network-button-container mt-4 flex justify-center ${selectedClass}`}>
      <button
        onClick={() => onClick(networkName)}
        className={`network-button hover:bg-primary-dark transform transition duration-300 ease-in-out hover:scale-110 ${
          isSelected ? "bg-selected" : "bg-normal"
        }`}
      >
        <img
          src={networkLogos[networkName]}
          alt={`${networkName} logo`}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          className="network-logo"
        />
        <span className="network-name">{networkName}</span>
      </button>
    </div>
  );
};

const handleOraNetworkClick = async (selectedNetwork: string) => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const selectedAccount = accounts[0];

      const networkChoice = selectedNetwork as NetworkName;

      if (networkChoice && networks[networkChoice]) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networks[networkChoice] }],
        });

        const web3 = new Web3(window.ethereum);

        try {
          const aiJudgeQuery = await oraService.getAiJudgeQuery(
            "a1227079-2577-4c32-a32a-59232361fd2e",
          );
          const txObject = prepareTransaction(
            selectedAccount,
            networkChoice,
            "a1227079-2577-4c32-a32a-59232361fd2e",
            aiJudgeQuery.query,
          );
          const beSignedTx = await oraService.validateTx(txObject);
          console.log("Backend Signed Tx:", beSignedTx);
          const rawTransaction = bs58.decode(beSignedTx.transaction);
          const rawTransactionHex = "0x" + rawTransaction.toString("hex");
          debugger;
          const txParams = await extractTransactionParams(rawTransactionHex, selectedAccount);
          const receipt = await signAndSendTransaction(txParams);

          console.log("Transaction successful, response:", receipt);
        } catch (error) {
          console.error("An error occurred with MetaMask:", error);
        }
      } else {
        alert("Invalid network selection or network not supported.");
      }
    } catch (error) {
      console.error("An error occurred whille handling ora network click:", error);
    }
  } else {
    alert("MetaMask is not installed. Please install it to proceed.");
  }
};

function prepareTransaction(
  selectedAccount: any,
  networkChoice: NetworkName,
  conversationId: string,
  query: string,
): any {
  const web3 = new Web3(window.ethereum);

  const contractAddress = contractAddresses[networkChoice];
  const contract = new web3.eth.Contract(oraAbi, contractAddress);
  const modelId = 11;

  // Encode the transaction data
  const txData = contract.methods.calculateAIResult(modelId, query).encodeABI();

  const txObject = {
    to: contractAddress,
    data: txData,
    gas: 1000000, // Estimate gas accordingly
    from: selectedAccount,
    conversationId,
  };

  // Serialize the transaction for backend validation
  return txObject;
}

async function extractTransactionParams(rawTransactionHex: string, selectedAccount: any) {
  // Use ethereumjs-tx to decode the transaction
  // @ts-ignore
  const tx = TransactionFactory.fromSerializedData(Buffer.from(rawTransactionHex.slice(2), "hex"));

  const txParams = {
    to: tx.to?.toString(),
    from: selectedAccount,
    data: tx.data.toString(),
    gas: tx.gasLimit.toString(16), // Convert to hexadecimal string
    value: tx.value.toString(16), // Convert to hexadecimal string
    nonce: tx.nonce.toString(16), // Convert to hexadecimal string
    chainId: tx.common.chainId().toString(16), // Convert to hexadecimal string
  };

  return txParams;
}

async function signAndSendTransaction(txParams: any) {
  try {
    const web3 = new Web3(window.ethereum);

    const transactionParameters = {
      to: txParams.to,
      from: txParams.from,
      data: txParams.data,
      gas: web3.utils.toHex(txParams.gas),
      value: web3.utils.toHex(txParams.value),
      nonce: web3.utils.toHex(txParams.nonce),
      chainId: txParams.chainId,
    };

    const receipt = await window.ethereum?.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    console.log("Transaction successful, response:", receipt);
  } catch (error) {
    console.error("An error occurred with while signing tranasction:", error);
  }
}

const oraAbi: any[] = [
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

export default OraNetworkModal;
