import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createToken } from '../state/action-creators';
import { createCategory } from '../state/action-creators';
import { createDifficulty } from '../state/action-creators';
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()
    const [token, settoken] = useState("")
    const [difficulty, setdifficulty] = useState("hard")
    const [category, setcategory] = useState('any')
    const opentdb = require('opentdb-api');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            window.location.reload();
        } else {
            console.log('page already loaded');
        }
        opentdb.getToken().then(newToken => {
            localStorage.setItem('token', newToken);
        });
        settoken(localStorage.getItem('token'));
    }, [loading])

    const setreduxtoken = () => {
        dispatch(createToken(token))
        dispatch(createCategory(category))
        dispatch(createDifficulty(difficulty))
        localStorage.setItem('category', category)
        localStorage.setItem('difficulty', difficulty)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 m-10 z-10">
            <div className="flex flex-col gap-3 w-64">

                <div className="mb-3">
                    <select required defaultValue={'any'}
                        onChange={(e) => { setcategory(e.target.value); }}
                        className="border w-full p-3 shadow-xl text-center rounded-lg focus:ring-blue-500 block font-semibold text-md dark:text-black bg-amber-400 border-gray-600 placeholder-gray-40 focus:border-blue-500"
                        aria-label="Default select example"
                    >
                        <option value="any">Any (Default)</option>
                        <option value="general">General</option>
                        <option value="books">Books</option>
                        <option value="film">Film</option>
                        <option value="music">Music</option>
                        <option value="theatre">Theatre</option>
                        <option value="television">Television</option>
                        <option value="videogames">Video Games</option>
                        <option value="boardgames">Board Games</option>
                        <option value="science">Science</option>
                        <option value="computers">Computers</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="mythology">Mythology</option>
                        <option value="sports">Sports</option>
                        <option value="geography">Geography</option>
                        <option value="history">History</option>
                        <option value="politics">Politics</option>
                        <option value="art">Art</option>
                        <option value="celebrities">Celebrities</option>
                        <option value="animals">Animals</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="comics">Comics</option>
                        <option value="gadgets">Gadgets</option>
                        <option value="anime">Anime</option>
                        <option value="cartoons">Cartoons</option>
                    </select>
                </div>

                <div className="mb-3">
                    <select required defaultValue={'hard'}
                        onChange={(e) => { setdifficulty(e.target.value) }}
                        className="border w-full p-3 shadow-xl text-center rounded-lg focus:ring-blue-500 block font-semibold text-md dark:text-black bg-amber-400 border-gray-600 placeholder-gray-40 focus:border-blue-500"
                        aria-label="Default select example"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>


                {/* <button onClick={()=>dispatch(createToken(token))} className="w-full text-white font-bold text-md uppercase bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2"> */}
                <Link to="/questions"><button onClick={setreduxtoken} className="w-full text-white font-bold text-md uppercase bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                    Start
                </button></Link>
                {/* <button className="w-full text-white font-bold text-md uppercase bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                    </button> */}

            </div>
        </div>
    )
}

export default Home