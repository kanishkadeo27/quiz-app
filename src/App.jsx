import { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./constant";
import { MONEY_PYRAMID, data } from "./constant";
import TriviaQuiz from "./components/TriviaQuiz";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const money_pyramid = useMemo(() => MONEY_PYRAMID, []);
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(money_pyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber]);
  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned : {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <TriviaQuiz
                    data={data}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {money_pyramid.map((item) => {
                return (
                  <li
                    className={
                      questionNumber === item.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                    key={item.id}
                  >
                    <span className="moneyListItemNumber">{item.id}</span>
                    <span className="moneyListItemAmount">{item.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
