import React, { useEffect, useState } from "react";

interface Box {
  id: string;
  name: string;
  mode: "Casual" | "Verifiable";
  ends: string;
}

interface FetchBoxesResponse {
  boxes: Box[];
  totalBoxes: number;
}

const mockFetchBoxes = (page: number): FetchBoxesResponse => {
  const boxes: Box[] = Array.from({ length: 6 }, (_, i) => ({
    id: `box-${page * 6 + i + 1}`,
    name: `Box ${page * 6 + i + 1}`,
    mode: Math.random() > 0.5 ? "Casual" : "Verifiable",
    ends: new Date(Date.now() + Math.random() * 10000000).toLocaleString(),
  }));

  return { boxes, totalBoxes: 18 };
};

const MyBoxes: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [totalBoxes, setTotalBoxes] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const { boxes, totalBoxes } = mockFetchBoxes(currentPage - 1);
    setBoxes(boxes);
    setTotalBoxes(totalBoxes);
  }, [currentPage]);

  const totalPages = Math.ceil(totalBoxes / 6);

  return (
    <div className="relative z-10 rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
      {/* Header Section */}
      <div className="relative mb-8 flex flex-wrap items-center justify-between space-y-2 md:space-y-0">
        <h1 className="mx-auto w-full text-center text-4xl font-bold tracking-wider text-red-400 md:w-auto">
          MY BOXES
        </h1>
      </div>

      {/* Boxes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="rounded-lg bg-gray-800/50 p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 text-center text-2xl font-semibold text-red-400">{box.name}</h2>
            <p className="text-center text-gray-300">
              Mode:{" "}
              <span className="font-semibold">
                {box.mode === "Casual" ? "🌴 Casual" : "🔒 Verifiable"}
              </span>
            </p>
            <p className="text-center text-gray-300">Ends: {box.ends}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`rounded-lg px-3 py-1 ${
              currentPage === i + 1 ? "bg-red-400 text-gray-900" : "bg-gray-700 text-gray-300"
            } transition-colors hover:bg-red-300`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyBoxes;
