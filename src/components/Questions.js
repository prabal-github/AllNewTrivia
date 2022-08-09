import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { increaseScore, increaseQuestionCount } from "../state/action-creators";

const Questions = () => {

    const dispatch = useDispatch();
    const [questions, setquestions] = useState([])
    const [questionNumber, setquestionNumber] = useState(-1)
    // const [newoptions, setnewoptions] = useState()
    const [selectedOption, setselectedOption] = useState("")
    const [showAnswer, setshowAnswer] = useState(false)
    const [optns, setoptns] = useState([])
    
    useEffect(() => {
        const opentdb = require('opentdb-api');
        const token = localStorage.getItem('token')
        const difficulty = localStorage.getItem('difficulty')
        const category = localStorage.getItem('category')

        var options = {
            amount: 5,
            category: category,
            difficulty: difficulty,
            type: 'multiple',
            token: token
        }
        opentdb.getTrivia(options).then(uniqueTrivia => {
            setquestions(uniqueTrivia)
            startquestioncount(uniqueTrivia);
        });

    }, [])

    const startquestioncount = (questions) => {
        var count = questionNumber;
        setquestionNumber(count + 1);
        for (let i = 0; i < questions.length; i++) {
            optns[i] = questions[i].incorrect_answers;
            optns[i].push(questions[i].correct_answer);

            // Randomize
            let currentIndex = optns[i].length, randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex !== 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [optns[i][currentIndex], optns[i][randomIndex]] = [
                    optns[i][randomIndex], optns[i][currentIndex]];
            }
        }

        // setnewoptions(optns)
    }

    const nextquestion = () => {
        var count = questionNumber;
        if (questionNumber < 4) { setquestionNumber(count + 1) };
        if (questions[questionNumber].correct_answer === selectedOption) {
            dispatch(increaseScore(1));
        }
        setshowAnswer(false)
        dispatch(increaseQuestionCount(1))
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 m-10 z-10 text-white">
            {questions.length > 0 ?
                <div className="flex flex-col gap-4">
                    {/* ----- QUESTION ----- */}
                    <div className="text-2xl font-bold text-center">
                        {questions[questionNumber].question}
                    </div>

                    {/* ----- OPTIONS ----- */}
                    <div className="flex flex-col gap-3 mt-5">
                        {optns[questionNumber].map(option => {
                            return (
                                <button type="button" onClick={() => setselectedOption(option)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-md font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-whiterounded-md group-hover:bg-opacity-0">
                                        {JSON.stringify(option).slice(1, -1)}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                    {!showAnswer ? <button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                        <div onClick={() => setshowAnswer(true)}>Show Answer</div>
                    </button> :
                        <div className="text-2xl font-bold text-center">
                            Answer:- {questions[questionNumber].correct_answer}
                        </div>}

                    {questionNumber < 4 ? <button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                        <div onClick={nextquestion}>Next</div>
                    </button> :

                        <Link to="/score"><button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                            <div onClick={nextquestion}>Show Score</div>
                        </button></Link>}

                </div>

                :
                <div className='text-5xl text-white'>Loading...</div>}

        </div>
    )
}

export default Questions