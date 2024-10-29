/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from "react";

import { jibril } from "@/utils/fonts";

// Define the shape of box data for better type safety
interface BoxData {
  name: string;
  isVerifiable: boolean;
  questions: string[];
  boxDuration: number;
}

const CreateBox: React.FC = () => {
  // State variables with types
  const [boxName, setBoxName] = useState<string>(""); // New state for box name
  const [isVerifiable, setIsVerifiable] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [boxDuration, setBoxDuration] = useState<number>(10); // Default duration is 10 minutes

  // Handler to add a question with a limit of 5 questions
  const handleAddQuestion = (): void => {
    if (newQuestion.trim() && questions.length < 5) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion(""); // Clear the input
    } else if (questions.length >= 5) {
      alert("You can only add up to 5 questions.");
    }
  };

  // Handler to remove a question
  const handleRemoveQuestion = (index: number): void => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Handler to submit the form
  const handleSubmit = (): void => {
    const boxData: BoxData = {
      name: boxName,
      isVerifiable,
      questions,
      boxDuration,
    };

    // You would replace this with your API call or form handling logic
    console.log("Creating Box with data:", boxData);

    // Reset form (optional)
    setBoxName("");
    setIsVerifiable(false);
    setQuestions([]);
    setBoxDuration(10);
    alert("AI Box Created Successfully!");
  };

  return (
    <div className="relative z-10 rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
      {/* Header Section */}
      <div className="relative mb-8 flex flex-wrap items-center justify-between space-y-2 md:space-y-0">
        <h1
          className="mx-auto w-full text-center text-4xl font-bold tracking-wider text-red-400 md:w-auto"
          style={jibril.style}
        >
          CREATE AI BOX
        </h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* 1. Box Name */}
        <div className="rounded-lg bg-gray-800/50 p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">🤔 Box Name</h2>
          <input
            type="text"
            placeholder="Enter box name..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900/50 p-4 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
            value={boxName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoxName(e.target.value)}
          />
        </div>

        {/* 2. Box Type Selector */}
        <div className="rounded-lg bg-gray-800/50 p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">📦 Box Type</h2>
          <div className="flex items-center justify-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="boxType"
                value="casual"
                checked={!isVerifiable}
                onChange={() => setIsVerifiable(false)}
                className="form-radio h-5 w-5 text-red-500"
              />
              <span className="text-gray-300">🌴 Casual Box</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="boxType"
                value="verifiable"
                checked={isVerifiable}
                onChange={() => setIsVerifiable(true)}
                className="form-radio h-5 w-5 text-red-500"
              />
              <span className="text-gray-300">🔒 Verifiable Box</span>
            </label>
          </div>
        </div>

        {/* 3. Question List Setup */}
        <div className="rounded-lg bg-gray-800/50 p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
            ✍️ AI Box Questions
          </h2>

          {/* Add New Question Input */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter a question..."
              className="w-full rounded-lg border border-gray-700 bg-gray-900/50 p-4 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={newQuestion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewQuestion(e.target.value)}
            />
            <button
              onClick={handleAddQuestion}
              className="rounded-full bg-red-400 p-3 transition-all hover:bg-red-300"
            >
              ➕
            </button>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-700 p-3 text-gray-300"
                >
                  <span className="w-4/5">{question}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-400 transition hover:text-red-500"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No questions added yet.</p>
            )}
          </div>
        </div>

        {/* 4. Duration Selector */}
        <div className="rounded-lg bg-gray-800/50 p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">⏰ Box Duration</h2>
          <p className="mb-4 text-center text-gray-300">
            Select how long you want your box to last (10 minutes to 24 hours).
          </p>
          <div className="flex items-center justify-center">
            <input
              type="range"
              min={10}
              max={1440}
              step={10}
              value={boxDuration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBoxDuration(Number(e.target.value))
              }
              className="w-3/4"
            />
            <span className="ml-4 text-xl text-gray-300">{boxDuration} mins</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-red-400 py-3 text-xl font-semibold text-gray-900 transition-all hover:bg-red-300 md:w-1/2"
          >
            Create Box
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBox;
