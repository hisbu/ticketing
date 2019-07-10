const INITIAL_STATE = {login:'', filmId:null}

export default (state = INITIAL_STATE, action) =>{
    if(action.type === 'LOGIN'){
        return {
            ...state,
            login: action.value
        }
    }else if(action.type === 'FILM_ID'){
        return {
            ...state,
            filmId: action.value
        }
    }else{
        return state
    }
}