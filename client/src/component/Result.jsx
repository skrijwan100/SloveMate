/* eslint-disable react/prop-types */

const Result = ({userAnswers, questions, resetQuiz = () => {}}) => {
    const correctAnswers = userAnswers.filter((answer) => answer).length;
  
    return (
      <div className="results bg-gray-900 px-8 py-4 pb-6 rounded-2xl">
        <h2 className="text-3xl my-3 mb-4">Results</h2>
        <p>
          You answered {correctAnswers} out of {questions.length} questions{" "}
          <span onClick={resetQuiz} className="text-blue-800 cursor-pointer">Click here to Retry</span>
        </p>
        <ul>
          {questions.map((question, index) => {
            return (
              <li className="bg-gray-700 w-full my-2 py-2 rounded hover:bg-gray-800 cursor-pointer px-6" key={index} data-correct={userAnswers[index]}>
                Q{index + 1}. {question.question}
                <b>
                  {userAnswers[index]
                    ? ""
                    : `- ${
                        question.answerOptions.find((ans) => ans.isCorrect).text
                      }`}
                </b>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default Result;
  