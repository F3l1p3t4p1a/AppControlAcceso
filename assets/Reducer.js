const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                loading: false,
                login: true,
                logout: false,
                userInfo: action.userInfo
            };
      
        case "LOGOUT":
            return {
                ...state,
                login: false,
                logout: true,
                userInfo: null
            };
        case "LOADING":
            return {
                ...state,
                loading: action.payload
            };
    
        
    }
};

export default reducer;