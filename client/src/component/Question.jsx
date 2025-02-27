/* eslint-disable react/prop-types */

const Question = ({question, onAnswerClick = () => {}}) => {
    return (
      <div className="bg-gray-900 px-8 py-4 pb-8 rounded-2xl">
        <h2 className="text-white text-lg mb-4">{question.question}</h2>
        <ul className="options space-y-4">
          {question.answerOptions.map((option) => {
            return (
              <li key={option.text}>
                <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 cursor-pointer" onClick={() => onAnswerClick(option.isCorrect)}>
                  {option.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default Question;
  