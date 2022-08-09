const initialState = 0
const reducer = (count = initialState, action) => {
    if (action.type === 'increaseQuesCount') {
        return count + action.payload
    }
    else if(action.type === 'RESET_COUNT_ITEM'){
        return initialState
    }
    else {
        return count;
    }
}

export default reducer