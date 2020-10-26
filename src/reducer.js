export const initialState={
    user:null
};

export const actionTypes={
    SET_USER:"Set_User"
}
const reducer = (state,action) => {
    console.log(action)
    switch(action.type){
        
        case "Set_User":
            return{
                ...state,
                user:action.user
            }    
            default:
            return state    
    }
};

export default reducer;
