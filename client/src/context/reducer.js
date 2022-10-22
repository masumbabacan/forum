const reducer = (state, action) => {
    //const {userId,id,title,completed}=action.payload;

    switch (action.type) {
        case "ADD_USER":
            const added = { ...state, user: action.payload };
            return added;
        default: 
            return state;
    }
}

export default reducer;