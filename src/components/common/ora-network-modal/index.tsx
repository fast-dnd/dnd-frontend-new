/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from "react";
import { ArrowFatDown, Confetti, CurrencyCircleDollar, Hash, Sword } from "@phosphor-icons/react";
import { toast } from "sonner";
import Web3 from "web3";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import oraService from "@/services/ora-network-service";
import tournamentService from "@/services/tournaments-service";
import { IOraCommitToTxHash } from "@/types/ora-network";
import { IGameState } from "@/types/room";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

type OraNetworkModalProps = {
  conversationId: string;
  aiJudgeQuery: string | undefined;
  aiJudgeQueryNormalized: string | undefined;
  aiJudgeProcessedQuery: boolean | undefined;
  roomState: IGameState;
};

const OraNetworkModal = ({
  conversationId,
  aiJudgeQuery,
  aiJudgeQueryNormalized,
  aiJudgeProcessedQuery,
  roomState,
}: OraNetworkModalProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | "">("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [communities, setCommunities] = useState<any[]>([]);
  const [selectedAiJudgeQuery, setAiJudgeQuery] = useState<string>("");
  const [selectedAiJudgeQueryNormalized, setAiJudgeQueryNormalized] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionStatus, setTransactionStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (roomState === "GAMING" || roomState === "LOSE") {
          setLoading(false); // Stop loading if early return
          return;
        }
        if (!aiJudgeQuery) {
          const aiJudgeResponse = await oraService.getAiJudgeQuery(conversationId);
          setAiJudgeQuery(aiJudgeResponse.query);
          setAiJudgeQueryNormalized(aiJudgeResponse.queryNormalized);
        } else {
          setAiJudgeQuery(aiJudgeQuery || "");
          setAiJudgeQueryNormalized(aiJudgeQueryNormalized || "");
        }
        const tournamentResponse = await tournamentService.getLatestTournament(); // No conversationId passed
        console.log(tournamentResponse);
        setCommunities(tournamentResponse.communities);
        if (tournamentResponse.communities.length > 0) {
          setSelectedCommunity(tournamentResponse.communities[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch AI Judge query:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [conversationId]);

  const handleNetworkSelection = (network: NetworkName) => {
    setSelectedNetwork(network);
  };

  const handleOraNetworkClick = async (
    selectedNetwork: string,
    conversationId: string,
    communityId: string,
    aiJudgeQuery: string,
  ) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setTransactionStatus("loading"); // Start loading spinner
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const selectedAccount = accounts[0];

        const networkChoice = selectedNetwork as NetworkName;

        if (networkChoice && networks[networkChoice]) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: networks[networkChoice] }],
          });

          try {
            const fee = await estimateFee(networkChoice, 11);
            let tx = await calculateAiTx(selectedAccount, networkChoice, aiJudgeQuery, fee);
            const txHash = tx.transactionHash;
            let commitData: IOraCommitToTxHash = {
              conversationId,
              communityId,
              txHash,
            };
            tx = await oraService.commitToTxHash(commitData);
            setTransactionStatus("success");
            toast.success(`Transaction successful : ${tx}`);
          } catch (error) {
            setTransactionStatus("error");
            toast.error(`An error occurred with MetaMask: ${error}`);
          }
        } else {
          toast.error("Invalid network selection or network not supported.");
        }
      } catch (error) {
        setTransactionStatus("error");
        toast.error(`An error occurred whille creating transaction: ${error}`);
      }
    } else {
      toast.error(`MetaMask is not installed. Please install it to proceed`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="max-lg:hidden">
        <button
          className="flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black p-4 transition-all duration-200 hover:bg-[#1B1B1B]"
          disabled={aiJudgeProcessedQuery || roomState === "GAMING" || roomState == "LOSE"}
        >
          {roomState === "GAMING" ? (
            <Sword size={32} color="white" />
          ) : roomState === "LOSE" ? (
            <Hash size={32} color="white" />
          ) : roomState === "WIN" && aiJudgeProcessedQuery ? (
            <Confetti size={32} color="green" />
          ) : (
            <CurrencyCircleDollar size={32} color="green" />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
        {transactionStatus === "loading" && (
          <div className="flex items-center justify-center">
            <Spinner className={cn("m-0 size-5 shrink-0 opacity-0", true && "opacity-50")} />
          </div>
        )}
        {transactionStatus === "success" && (
          <div className="flex items-center justify-center text-green-500">
            <span className="material-icons">check_circle</span>
            Transaction successfully created. System will be processing it soon.
          </div>
        )}
        {transactionStatus === "error" && (
          <div className="flex items-center justify-center text-red-500">
            <span className="material-icons">Transaction failed.</span>
          </div>
        )}
        {transactionStatus === "idle" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              <div className="size-2 shrink-0 rotate-45 bg-primary" />
              <p
                className="mt-1 text-lg uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
                style={jibril.style}
              >
                Participate in Community battles
              </p>
              <div className="size-2 shrink-0 rotate-45 bg-primary" />
            </div>
            <br />
            <br />
            <p className="ml-2 text-center font-light lg:text-xl lg:tracking-[1.5px]">
              By executing transaction selected transcript will be evaulated by AI Judge and
              depending on its rating you will climb in selected community leaderboard
            </p>
            {/* TODO: Return query to be seen somehow */}
            {/* <div className="mt-10">
              <Collapsible title="Query">
                {loading ? (
                  <p className="text-center font-light lg:text-xl lg:tracking-[1.5px]">
                    Loading AI Judge Query...
                  </p>
                ) : (
                  <p className="text-center font-light lg:text-xl lg:tracking-[1.5px]">
                    {selectedAiJudgeQuery}
                  </p>
                )}
              </Collapsible>
            </div> */}

            <div className={cn("glass-effect-2", "relative flex flex-col items-center")}>
              <p className="ml-2 mt-10 text-center font-light lg:text-xl lg:tracking-[1.5px]">
                Select community :
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {communities.map((community) => (
                  <CommunitySelectionButton
                    key={community._id}
                    communityId={community._id}
                    communityName={community.name}
                    onClick={() => setSelectedCommunity(community._id)}
                    communityLogoImgUrl={community.logoImageUrl}
                    isSelected={selectedCommunity === community._id}
                  />
                ))}
              </div>
              <p className="ml-2 mt-10 text-center font-light lg:text-xl lg:tracking-[1.5px]">
                Select payment chain :
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {Object.entries(networks).map(([name, id]) => (
                  <NetworkSelectionButton
                    networkName={name as NetworkName}
                    onClick={() => handleNetworkSelection(name as NetworkName)}
                    networkLogos={networkLogos}
                    isSelected={selectedNetwork === name}
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={() =>
                handleOraNetworkClick(
                  selectedNetwork,
                  conversationId,
                  selectedCommunity,
                  selectedAiJudgeQueryNormalized,
                )
              }
              className="hover:bg-primary-dark bg-primary"
              disabled={!selectedNetwork || !selectedCommunity}
            >
              Compete
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

type NetworkName =
  // | "Optimism"
  // | "Optimism Sepolia"
  "Arbitrum" | "ArbitrumSepoliaTestnet";
// | "Manta"
// | "Manta Sepolia Testnet"
// | "Linea"
// | "Base"
// | "Polygon";
// | "Mantle";

const networkLogos: { [key in NetworkName]: string } = {
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
const networks: Record<NetworkName, string> = {
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

const contractAddresses: { [key in NetworkName]: string } = {
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

interface NetworkButtonProps {
  networkName: NetworkName;
  onClick: (networkName: NetworkName) => void;
  networkLogos: { [key: string]: string };
  isSelected: boolean;
}

const NetworkSelectionButton: React.FC<NetworkButtonProps> = ({
  networkName,
  onClick,
  isSelected,
}) => {
  return (
    <div className={`network-button-container relative mt-4 flex justify-center`}>
      {isSelected && (
        <ArrowFatDown
          className=" absolute -top-7 text-green-500"
          size={24} // Adjust the size as nee ded
        />
      )}
      <button
        onClick={() => onClick(networkName)}
        className={`network-button duration-2000 flex flex-col items-center transition ease-in-out `}
      >
        <img
          src={networkLogos[networkName]}
          alt={`${networkName} logo`}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          className="network-logo"
        />
        <span className="network-name">
          {networkName == "Arbitrum" ? "Mainnet(x1.3 multiplier)" : "Testnet"}
        </span>
      </button>
    </div>
  );
};

interface CommunityButtonProps {
  communityId: string;
  communityName: string;
  communityLogoImgUrl: string;
  onClick: (communityId: string) => void;
  isSelected: boolean;
}

const CommunitySelectionButton: React.FC<CommunityButtonProps> = ({
  communityId,
  communityName,
  communityLogoImgUrl,
  onClick,
  isSelected,
}) => {
  return (
    <div className={`community-button-container relative mt-4 flex justify-center `}>
      {isSelected && (
        <ArrowFatDown
          className="absolute -top-7 text-green-500"
          size={24} // Adjust the size as nee ded
        />
      )}
      <button
        onClick={() => onClick(communityId)}
        className={`community-button transition duration-300 ease-in-out `}
      >
        <img
          src={communityLogoImgUrl}
          alt={`${communityName} logo`}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          className="community-logo"
        />
        <span className="community-name">{communityName}</span>
      </button>
    </div>
  );
};

async function calculateAiTx(
  selectedAccount: any,
  networkChoice: NetworkName,
  query: string,
  estimatedFee: string,
): Promise<any> {
  const web3 = new Web3(window.ethereum);

  const contractAddress = contractAddresses[networkChoice];
  const contract = new web3.eth.Contract(oraAbi, contractAddress);
  const modelId = 11;

  // Encode the transaction data
  const tx = await contract.methods.calculateAIResult(modelId, query).send({
    from: selectedAccount,
    value: estimatedFee,
  });

  // Serialize the transaction for backend validation
  return tx;
}

async function estimateFee(networkChoice: NetworkName, modelId: number): Promise<string> {
  const web3 = new Web3(window.ethereum);

  const contractAddress = contractAddresses[networkChoice];
  const contract = new web3.eth.Contract(oraAbi, contractAddress);

  try {
    const estimatedFee: string = await contract.methods.estimateFee(modelId).call();
    return estimatedFee;
  } catch (error) {
    console.error("Error estimating fee:", error);
    throw error; // Optionally rethrow the error if you want to handle it elsewhere
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
