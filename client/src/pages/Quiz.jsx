import React, { useEffect, useState } from 'react'
import Question from '../component/Question';
import Result from '../component/Result';
import questions from '../constants/questions.json';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { usePromptData } from '../contexts/promptDataContext';

const Quiz = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [promptData, setPromptData] = usePromptData()

  // Apply dark mode on initial render
  // useEffect(() => {
  //   document.documentElement.classList.add('dark');
  // }, []);

  const generateQuiz = async () => {
    if (!promptData.trim()) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const promptContent = `
        Generate 10 quiz questions about ${promptData} in JSON format:
        [
          {
            "id": 1,
            "question": "Question text",
            "type": "multiple_choice",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "answer": "Correct Option"
          },
          ...
        ]
        Requirements:
        - Strictly valid JSON format
        - Answer must match exactly one option
        - No additional text outside the JSON array
      `;

      const result = await model.generateContent(promptContent);
      const responseText = result.response.text();
      console.log("Generated Quiz JSON:", result);

      const jsonStart = responseText.indexOf('[');
      const jsonEnd = responseText.lastIndexOf(']') + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);

      const parsedQuizzes = JSON.parse(jsonString);
      setQuizzes(parsedQuizzes);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (promptData && promptData.trim()) {
      generateQuiz();
    }
  }, [promptData]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizzes[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleCreateNewQuiz = () => {
    setLoading(true);
    generateQuiz();
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-[5rem] px-4 py-8">
        {quizzes.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Generate Your Quiz</h2>
            <div className="space-y-4">
              <button
                onClick={generateQuiz}
                disabled={loading || !promptData.trim()}
                className={`w-full cursor-pointer py-3 px-4 rounded-lg font-medium ${
                  loading || !promptData.trim()
                    ? 'bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800'
                } text-white transition-colors`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Quiz'
                )}
              </button>
            </div>
          </div>
        ) : quizCompleted ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-6">
              Your score: <span className="font-bold text-indigo-600 dark:text-indigo-400">{score}</span> out of {quizzes.length}
            </p>
            <div className="mb-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full"
                  style={{ width: `${(score / quizzes.length) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm dark:text-gray-300">
                {Math.round((score / quizzes.length) * 100)}% correct
              </p>
            </div>
            <button
              onClick={handleCreateNewQuiz}
              className="px-6 py-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white rounded-lg font-medium transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Create New Quiz'
              )}
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1} of {quizzes.length}
                </span>
                <span className="text-sm font-medium dark:text-gray-300">
                  Score: <span className="text-indigo-600 dark:text-indigo-400">{score}</span>
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-6 dark:text-white">
                {quizzes[currentQuestion].question}
              </h3>

              <div className="space-y-3 mb-8">
                {quizzes[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg border transition-colors ${
                      selectedOption === option
                        ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:border-indigo-700 dark:text-white'
                        : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className={`w-full cursor-pointer py-3 px-4 rounded-lg font-medium ${
                  !selectedOption
                    ? 'bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800'
                } text-white transition-colors`}
              >
                {currentQuestion === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz