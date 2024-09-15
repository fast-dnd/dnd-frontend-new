/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface OraTransactionsModalProps {
  imageUrl: string;
  username: string;
  rating: number;
  rank: number;
  transactions:
    | Array<{
        txHash: string;
        chain: string;
        createdAt: string;
        rating: number;
      }>
    | undefined;
}

const OraTransactionsModal = ({
  imageUrl,
  username,
  rating,
  rank,
  transactions,
}: OraTransactionsModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  if (!transactions) {
    transactions = [];
  }
  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Get current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full border-black">See all transactions</button>
      </DialogTrigger>
      <DialogContent className="z-50 flex flex-col gap-4 rounded-lg bg-black p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* Rank */}
          <div className="text-left">
            <h2 className="text-xl font-bold">#{rank}</h2>
          </div>
          {/* Username */}
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold">{username}</p>
          </div>
          {/* Rating */}
          <div className="text-right">
            <p className="text-sm text-gray-300">Rating: {rating}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <img
            src={imageUrl || "/images/default-avatar.png"}
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "50%",
              transition: "transform 0.3s ease",
            }}
          />
          {/* Transactions Table */}
          <div className="mt-4 w-full">
            {currentTransactions.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="px-4 py-2">Provisioned</th>
                    <th className="px-4 py-2">Chain</th>
                    <th className="px-4 py-2">Transaction Hash</th>
                    <th className="px-4 py-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        {new Date(transaction.createdAt).toLocaleDateString("en-CA")}
                      </td>{" "}
                      <td className="px-4 py-2">
                        <img
                          src={getChainImage(transaction.chain as NetworkName)}
                          alt={transaction.chain}
                          style={{ height: "24px" }}
                        />
                      </td>{" "}
                      <td className="px-4 py-2">
                        <a
                          href={`https://sepolia.arbiscan.io/tx/${transaction.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {`${transaction.txHash.slice(0, 3)}...${transaction.txHash.slice(-3)}`}
                        </a>
                      </td>
                      <td className="px-4 py-2">{transaction.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400">No transactions available.</p>
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <nav>
                <ul className="inline-flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        onClick={() => handlePageChange(pageNumber)}
                        className={`rounded px-3 py-1 ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

type NetworkName = "Arbitrum" | "ArbitrumSepoliaTestnet";

const getChainImage = (chainName: NetworkName) => {
  switch (chainName) {
    case "Arbitrum":
    case "ArbitrumSepoliaTestnet":
      return "/images/logos/arbitrum-arb-logo.png";
    // Add more cases here if you have other chains
    default:
      return "/images/logos/default-logo.png"; // A default image if chain is unrecognized
  }
};

export default OraTransactionsModal;
