export const fromLoginPage =(ya)=>{
    return{
        type : 'LOGIN',
        action : ya
    }
}

export const filmId = (id)=>{
    return{
        type: 'FILM_ID',
        action : id
    }
}