export const increaseScore = (score) => {
    return (dispatch) => {
        dispatch({
            type: 'increase',
            payload: score
        })
    }
}

export const resetScoreItem = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_SCORE_ITEM"
        })
    }
}

export const increaseQuestionCount = (count) => {
    return (dispatch) => {
        dispatch({
            type: 'increaseQuesCount',
            payload: count
        })
    }
}
export const resetCountItem = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_COUNT_ITEM"
        })
    }
}
export const createToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: 'settoken',
            payload: token
        })
    }

}
export const createCategory = (category) => {
    return (dispatch) => {
        dispatch({
            type: 'setcategory',
            payload: category
        })
    }
}
export const createDifficulty = (difficulty) => {
    return (dispatch) => {
        dispatch({
            type: 'setdifficulty',
            payload: difficulty
        })
    }
}