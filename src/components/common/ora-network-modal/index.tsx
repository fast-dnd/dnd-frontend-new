/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { ArrowFatDown } from "@phosphor-icons/react";
import Web3 from "web3";

import { contractAddresses, networkLogos, NetworkName, oraAbi } from "./interfaces";

export interface NetworkButtonProps {
  networkName: NetworkName;
  onClick: (networkName: NetworkName) => void;
  networkLogos: { [key: string]: string };
  isSelected: boolean;
}

export const NetworkSelectionButton: React.FC<NetworkButtonProps> = ({
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
          {["Arbitrum", "Linea", "Optimism", "Polygon"].includes(networkName)
            ? "Mainnet(x1.3)"
            : "Testnet"}
        </span>
      </button>
    </div>
  );
};

export async function calculateAiTx(
  selectedAccount: any,
  networkChoice: NetworkName,
  query: string,
  estimatedFee: string,
): Promise<any> {
  const web3 = new Web3(window.ethereum);

  const contractAddress = contractAddresses[networkChoice];
  const contract = new web3.eth.Contract(oraAbi, contractAddress);
  const modelId = 11;
  const estimatedFeeBigInt = BigInt(estimatedFee);
  const multipliedFee = (estimatedFeeBigInt * BigInt(12)) / BigInt(10);

  // Encode the transaction data
  const tx = await contract.methods.calculateAIResult(modelId, query).send({
    from: selectedAccount,
    value: multipliedFee.toString(),
  });

  // Serialize the transaction for backend validation
  return tx;
}

export async function estimateFee(networkChoice: NetworkName, modelId: number): Promise<string> {
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
