import { combineReducers } from "redux";
import scoreReducer from "./scoreReducer";
import tokenreducer from "./tokenreducer";
import categoryReducer from "./categoryReducer";
import difficultyReducer from "./difficultyReducer";
import questionCountReducer from "./questionCountReducer"


const reducers = combineReducers({
    score: scoreReducer,
    token: tokenreducer,
    category: categoryReducer,
    difficulty: difficultyReducer,
    questionCount: questionCountReducer,
})

export default reducers;