import { put, call } from 'redux-saga/effects'
import ActionCreators from '../actionCreators'
import jwtDecode from 'jwt-decode'

export const login = ({ api }) => function* (action){
    let token = ''
    const login = yield call(api.login, {
        email: action.email,
        passwd: action.passwd 
    })
        
    if(login.data.token){
        
        // pegar o token do login
        token = login.data.token    

        // setando o token no localStorage
        // o localStorage fica no browser voce consegue ver 
        // em inspecionar e application
        localStorage.setItem('token', token)
    
        //decodificar o token
        const user = jwtDecode(token)
        localStorage.setItem('user', user)
        yield put(ActionCreators.signinSuccess(user))
    }else{
    //se erro ao logar   
    yield put(ActionCreators.signinFailure(login.data.message))     
      
    }

}
   
export const auth = ({ api }) => function* (){
   // console.log('auth')  
    
    const token = localStorage.getItem('token')
    if(token){
        try{
            //const user = jwtDecode(token)
            const user = yield call(api.getUser, 'me') 

            yield put(ActionCreators.authSuccess(user.data))
        }catch(err){
            yield put(ActionCreators.authFailure('invalid token'))    
        }
    }else{
        yield put(ActionCreators.authFailure('no token'))
    }    
}
 
export const updateProfile = ({ api }) => function* (action){
   const userToSave = {
    ...action.user
  }     
  yield call(api.updateUser, userToSave)  
  yield put(ActionCreators.updateProfileSuccess(userToSave))

}

export const createProfile = ({ api }) => function* (action){
      const userToSave = {
       ...action.user
    }     
    const user = yield call(api.createUser, userToSave)
    if(user && user.data && user.data.error){
        yield put(ActionCreators.createProfileFailure(user.data.message))    
    }else{
        yield put(ActionCreators.createProfileSuccess(userToSave))
        yield put(ActionCreators.signinRequest(userToSave.email, userToSave.passwd))
        
    }
}
   
   
export function* destroyAuth(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    yield put(ActionCreators.destroyAuthSuccess())
}