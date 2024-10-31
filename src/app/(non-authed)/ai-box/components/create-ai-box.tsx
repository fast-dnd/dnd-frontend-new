import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ToggleSwitch from "@/components/common/toggle-switch";
import aiBoxService from "@/services/aibox-service";
import { jibril } from "@/utils/fonts";

const CreateBox: React.FC = () => {
  const router = useRouter();

  const [boxName, setBoxName] = useState<string>(""); // Box name state
  const [isVerifiable, setIsVerifiable] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [boxDuration, setBoxDuration] = useState<number>(20); // Duration in minutes
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddQuestion = (): void => {
    if (newQuestion.trim() && questions.length < 5) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion("");
    } else if (questions.length >= 5) {
      alert("You can only add up to 5 questions.");
    }
  };

  const handleRemoveQuestion = (index: number): void => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await aiBoxService.createAiBox({
        name: boxName,
        duration: boxDuration,
        verifiable: isVerifiable,
        questions,
      });
      router.push("/ai-box/collection"); // Redirect on success
    } catch (error) {
      console.error("Error creating AI Box:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-xl p-1 backdrop-blur-xl lg:bg-gray-900/80 lg:p-4">
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
            onChange={(e) => setBoxName(e.target.value.slice(0, 15))}
            maxLength={15}
          />
          <p className="mt-2 text-right text-gray-500">{boxName.length}/15</p>
        </div>

        {/* 2. Box Type Selector */}
        <div className="rounded-lg bg-gray-800/50 p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">📦 Box Type</h2>
          <div className="flex items-center justify-center space-x-4">
            <ToggleSwitch
              on={!isVerifiable}
              setOn={() => setIsVerifiable(!isVerifiable)}
              items={[
                { text: "Verifiable Box", icon: <>🔒</> },
                { text: "Casual Box", icon: <>🌴</> },
              ]}
            />
          </div>
        </div>

        {/* 3. Question List Setup */}
        <div className="rounded-lg bg-gray-800/50 p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
            ✍️ AI Box Questions
          </h2>

          {/* Add New Question Input */}
          <div className="mb-4 space-y-1">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter a question..."
                className="w-full rounded-lg border border-gray-700 bg-gray-900/50 p-4 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value.slice(0, 150))}
                maxLength={150}
              />
              <button
                onClick={handleAddQuestion}
                className="rounded-full bg-red-400 p-3 transition-all hover:bg-red-300"
              >
                ➕
              </button>
            </div>
            <p className="pr-14 text-right text-gray-500">{newQuestion.length}/150</p>
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
            Select how long you want your box to last (20 minutes to 24 hours).
          </p>
          <div className="flex items-center justify-center">
            <input
              type="range"
              min={20}
              max={1440}
              step={10}
              value={boxDuration}
              onChange={(e) => setBoxDuration(Number(e.target.value))}
              className="w-3/4"
            />
            <span className="ml-4 text-xl text-gray-300">{boxDuration} mins</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full rounded-lg bg-red-400 py-3 text-xl font-semibold text-gray-900 transition-all hover:bg-red-300 md:w-1/2"
          >
            {isSubmitting ? "Creating..." : "Create Box"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBox;
