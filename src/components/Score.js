import { React, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetScoreItem, resetCountItem } from '../state/action-creators';



const Score = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  var token = "";
  useEffect(() => {
    token = localStorage.getItem('token')
  }, [])

  const score = useSelector(state => state.score)
  const count = useSelector(state => state.questionCount)
  const scorePercentage = (score / count) * 100;
  const reset = () => {
    const opentdb = require('opentdb-api');
    dispatch(resetScoreItem());
    dispatch(resetCountItem());
    opentdb.resetToken(token);
    localStorage.clear();
    navigate("/", { replace: false });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 m-10">
      <div>
        <div className="text-2xl font-bold text-center">Your Score: {score}/{count} </div>
        <Link to="/questions"><button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
          <div>Lets try 5 more questions</div>
        </button></Link>

        <button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
          <div onClick={() => reset()}>Reset</div>
        </button>

        <div className="align-middle">
          {
            scorePercentage < 50 ? <img alt="Sad mickey" src="sad.png" className="h-72 m-5" /> :
              ((scorePercentage >= 50 && scorePercentage < 80) ? <img alt="happy mickey" src="medium.png" className="h-72 m-5" /> : <img alt="super happy mickey" src="happy.png" className="h-72 m-5" />)
          }

        </div>

      </div>
    </div>
  )
}

export default Score