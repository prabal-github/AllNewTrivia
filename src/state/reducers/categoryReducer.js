const reducer = (category=null, action) => {
    if (action.type === 'setcategory') {
        return action.payload
    }
    else{
        return category
    }
}

export default reducer