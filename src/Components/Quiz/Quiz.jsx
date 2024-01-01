import { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

function Quiz() {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [selected, setSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  let option_arr = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (selected === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("incorrect");
        option_arr[question.ans - 1].current.classList.add("correct");
      }
      setSelected(!selected);
    }
  };

  // for next button to display next question
  const submitAnswer = () => {
    if (selected) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setSelected(false);
      option_arr.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("incorrect");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[index]);
    setScore(0);
    setSelected(false);
    setResult(false);
  };

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <>
            <h3>
              You Scored {score} out of {data.length}
            </h3>
            <button onClick={reset}>
              <span>Reset</span>
            </button>
          </>
        ) : (
          <>
            <h3>
              {index + 1}. {question.question}
            </h3>
            <ul>
              <li
                ref={Option1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={Option2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={Option3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={Option4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={submitAnswer}>
              <span>Next</span>
            </button>
            <div className="index">
              <p>
                {index + 1} of {data.length} questions
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Quiz;
