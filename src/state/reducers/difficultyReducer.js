const reducer = (difficulty=null, action) => {
    if (action.type === 'setdifficulty') {
        return action.payload
    }
    else{
        return difficulty
    }
}

export default reducer