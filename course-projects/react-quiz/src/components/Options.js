import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, index, answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions[index].options.map((option, selected) => (
        <button
          className={`btn btn-option${answer === selected ? " answer" : ""}
          ${
            hasAnswered
              ? selected === questions[index].correctOption
                ? " correct"
                : " wrong"
              : ""
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: selected })}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
