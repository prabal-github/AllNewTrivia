const reducer = (token=null, action) => {
    if (action.type === 'settoken') {
        return action.payload
    }
    else{
        return token
    }
}

export default reducer