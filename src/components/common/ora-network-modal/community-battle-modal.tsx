/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from "react";
import { ArrowFatDown, Confetti, CurrencyCircleDollar } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import oraService from "@/services/ora-network-service";
import tournamentService from "@/services/tournament-service";
import { IOraCBCommitToTxHash } from "@/types/ora-network";
import { IGameState } from "@/types/room";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import { calculateAiTx, estimateFee, NetworkSelectionButton } from ".";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { networkLogos, NetworkName, networks } from "./interfaces";

type OraCommunityBattlesPromptModalProps = {
  conversationId: string;
  aiJudgeQuery: string | undefined;
  aiJudgeQueryNormalized: string | undefined;
  aiJudgeProcessedQuery: boolean | undefined;
  roomState: IGameState;
};

const OraCommunityBattlesPromptModal = ({
  conversationId,
  aiJudgeQuery,
  aiJudgeQueryNormalized,
  aiJudgeProcessedQuery,
  roomState,
}: OraCommunityBattlesPromptModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | "">("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [communities, setCommunities] = useState<any[]>([]);
  const [selectedAiJudgeQuery, setAiJudgeQuery] = useState<string>("");
  const [selectedAiJudgeQueryNormalized, setAiJudgeQueryNormalized] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [isAdditionalDescriptionVisible, setIsAdditionalDescriptionVisible] = useState(false);

  const toggleAdditionalDescription = () => {
    setIsAdditionalDescriptionVisible(!isAdditionalDescriptionVisible);
  };

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      try {
        if (!aiJudgeQuery) {
          const aiJudgeResponse = await oraService.cbGetAiJudgeQuery(conversationId);
          setAiJudgeQuery(aiJudgeResponse.query);
          setAiJudgeQueryNormalized(aiJudgeResponse.queryNormalized);
        } else {
          setAiJudgeQuery(aiJudgeQuery || "");
          setAiJudgeQueryNormalized(aiJudgeQueryNormalized || "");
        }
        const tournamentResponse = await tournamentService.getLatestTournament(); // No conversationId passed
        setCommunities(tournamentResponse.communities);
        if (tournamentResponse.communities.length > 0) {
          setSelectedCommunity(tournamentResponse.communities[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch AI Judge query:", error);
      }
    };

    fetchData();
  }, [conversationId, isOpen]);

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
            let commitData: IOraCBCommitToTxHash = {
              conversationId,
              communityId,
              txHash,
            };
            tx = await oraService.cbCommitToTxHash(commitData);
            setTransactionStatus("success");
            toast.success(`Transaction successful`);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="max-lg:hidden">
        {roomState === "WIN" && !aiJudgeProcessedQuery ? (
          <button
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-full p-4 transition-all duration-200",
              "duration-2000 animate-pulse", // bg-black for WIN without aiJudgeProcessedQuery
            )}
            disabled={aiJudgeProcessedQuery}
          >
            <CurrencyCircleDollar size={40} color="green" />
          </button>
        ) : roomState === "WIN" && aiJudgeProcessedQuery ? (
          <Confetti size={32} color="green" />
        ) : null}
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
          {transactionStatus === "loading" && (
            <div className="relative flex flex-col items-center justify-center text-xl">
              <p>Transaction in progress</p>
              <img
                src="/images/transaction-in-progress.png"
                alt="ora logo"
                style={{ width: "200px", height: "200px", objectFit: "contain" }}
                className="ora-logo  animate-pulse"
              />
            </div>
          )}
          {transactionStatus === "success" && (
            <div className="flex flex-col items-center justify-center text-xl text-green-500">
              <p>Transaction successfully created. System will be processing it soon. (~1min)</p>
              <img
                src="/images/transaction-passed.png"
                alt="ora logo"
                style={{ width: "200px", height: "200px", objectFit: "contain" }}
                className="ora-logo"
              />
            </div>
          )}
          {transactionStatus === "error" && (
            <div className="flex flex-col items-center justify-center text-xl text-red-500">
              <p>Transaction failed. Please try again</p>
              <img
                src="/images/transaction-failed.png"
                alt="ora logo"
                style={{ width: "200px", height: "200px", objectFit: "contain" }}
                className="ora-logo"
              />
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
                depending on its rating you will climb in selected community leaderboard.
              </p>
              <div className="flex cursor-pointer" onClick={toggleAdditionalDescription}>
                <p className="-mt-0.5 truncate text-xl tracking-[0.15em]">Additional Information</p>
                <span className="ml-2">
                  {isAdditionalDescriptionVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {isAdditionalDescriptionVisible && (
                <ul className="lg:text-mid list-inside list-disc font-light lg:tracking-[1.5px]">
                  <li>1st transaction of the day gets 100% of AI Judge value.</li>
                  <li>2nd transaction of the day gets 30% of AI Judge value.</li>
                  <li>3rd transaction of the day gets 10% of AI Judge value.</li>
                  <li>All subsequent transactions get exponentially lower.</li>
                </ul>
              )}

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
                      key={id}
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
      )}
    </Dialog>
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

export default OraCommunityBattlesPromptModal;
