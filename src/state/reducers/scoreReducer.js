const initialState = 0
const reducer = (score = initialState, action) => {
    if (action.type === 'increase') {
        return score + action.payload
    }
    else if(action.type === 'RESET_SCORE_ITEM'){
        return initialState
    }
    else {
        return score;
    }
}

export default reducer