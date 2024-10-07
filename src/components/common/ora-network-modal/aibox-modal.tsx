/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from "react";
import { ArrowFatDown } from "@phosphor-icons/react";
import { IoMdSend } from "react-icons/io";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import aiBoxService from "@/services/aibox-service";
import oraService from "@/services/ora-network-service";
import { IOraABoxCommitToTxHash } from "@/types/ora-network";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import { calculateAiTx, estimateFee, NetworkSelectionButton } from ".";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { networkLogos, NetworkName, networks } from "./interfaces";

type OraAiBoxPromptModalProps = {
  aiBoxId: string;
  prompt: string;
  shouldPop: boolean;
};

const OraAiBoxPromptModal = ({ aiBoxId, prompt, shouldPop }: OraAiBoxPromptModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | "">("");
  const [selectedAiJudgeQueryNormalized, setAiJudgeQueryNormalized] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      try {
        const res = await aiBoxService.submitPrompt(aiBoxId, prompt);
        setAiJudgeQueryNormalized(res.oraQuery);
      } catch (error) {
        console.error("Failed to fetch ai judge query:", error);
      }
    };
    fetchData();
  }, [isOpen]);

  const handleNetworkSelection = (network: NetworkName) => {
    setSelectedNetwork(network);
  };

  const handleOraNetworkClick = async (
    selectedNetwork: string,
    aiBoxId: string,
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
            let commitData: IOraABoxCommitToTxHash = {
              aiBoxId,
              txHash,
            };
            tx = await oraService.abCommitToTxHash(commitData);
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
        <div>
          {shouldPop ? (
            <Button
              type="submit"
              variant="ghost"
              className="flex items-center justify-center text-primary"
              aria-label="Send"
            >
              <IoMdSend className="text-3xl" /> {/* Ensure consistent size with emoji */}
            </Button>
          ) : (
            <Tooltip content="Prompt has already been sent. It can take up to couple of minutes for it to resolve. Refresh the page to check if it was processed. Wait till tomorrow for new challenge !">
              <Button
                type="submit"
                variant="ghost"
                className="flex items-center justify-center text-primary"
                aria-label="Send"
                disabled
              >
                <IoMdSend className="text-3xl" /> {/* Ensure consistent size with emoji */}
              </Button>
            </Tooltip>
          )}
        </div>
      </DialogTrigger>
      {isOpen && shouldPop && (
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
              <p>Transaction successfully created. System will be processing it soon (~1min).</p>
              <img
                src="/images/transaction-passed.png"
                alt="ora logo"
                style={{ width: "200px", height: "200px", objectFit: "contain" }}
                className="ora-logo"
              />
            </div>
          )}
          {transactionStatus === "error" && (
            <div className="flex flex-col items-center justify-center text-xl text-red-400">
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
                  Participate in Daily Ai-Box battle
                </p>
                <div className="size-2 shrink-0 rotate-45 bg-primary" />
              </div>
              <br />
              <p className="ml-2 text-center font-light lg:text-xl lg:tracking-[1.5px]">
                <strong>Prompt</strong>: {prompt}
              </p>
              <br />
              <p className="ml-2 text-center font-light lg:text-xl lg:tracking-[1.5px]">
                By executing transaction selected prompt will be evaulated by AI Judge and depending
                on its rating you will have chance to win daily prize.
              </p>
              <div className={cn("glass-effect-2", "relative flex flex-col items-center")}>
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
                  handleOraNetworkClick(selectedNetwork, aiBoxId, selectedAiJudgeQueryNormalized)
                }
                className="hover:bg-primary-dark bg-primary"
                disabled={!selectedNetwork}
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

export default OraAiBoxPromptModal;
