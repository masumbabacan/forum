const reducer = (state, action) => {
    //const {name,surname,username,email}=action.payload;

    switch (action.type) {
        case "ADD_USER":
            const added = { ...state, user: action.payload };
            return added;
        case "LOGOUT":
            const logout = {...state,user:null};
            return logout;
        default: 
            return state;
    }
}

export default reducer;