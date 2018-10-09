//aqui fica os relacionamento com o auth

import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuthing: false,
    isAuth: false,
    isSigningin: false,
    isSaving: false,
    saved: false,
    user:{},
    error: false,
    errorMessage:''
}

//***** Inicio do reducers do login ****
//Recebe o estado e a action e retorna um novo estado

//Requesitando o login
export const signinRequest = (state = INITIAL_STATE, action) => {
   return {
      ...state, //Spread_operator -> recebe tudo que tem em state
      isSigningin:true, // true -> está logando
      error: false, // false -> pois ainda está logando
      errorMessage: '' // limpa a msg pois ainda está logando
   }
}

//Obtendo Sucesso no login
export const signinSuccess = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSigningin: false, // false -> não está logando
        isAuth: true, // true -> está logado(logou)
        user: action.user // define o usuario que está logado

    }
}

//Obtendo ERRO no login
export const signinFailure = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSigningin: false, // false -> não está logando
        error: true, // true -> ocorreu erro ao logar
        errorMessage: action.error // obtendo a msg de erro

    }
}

export const authRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state, //Spread_operator -> recebe tudo que tem em state
       isSigningin:true, // true -> está logando
       error: false, // false -> pois ainda está logando
       errorMessage: '' // limpa a msg pois ainda está logando
    }
}
  
export const authSuccess = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSigningin: false, // false -> não está logando
        isAuth: true, // true -> está logado(logou)
        user: action.user // define o usuario que está logado
 
    }
}
  
export const authFailure = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSigningin: false, // false -> não está logando
        isAuth: false,  // false -> não está logado
      //  error: true, // true -> ocorreu erro ao logar
      //  errorMessage: action.error // obtendo a msg de erro
 
    }
}


// *****updateProfile**********************************

export const updateProfileRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state, 
       isSaving:true,
       error: false, 
       errorMessage: '',
       saved: false 
    }
}
  
export const updateProfileSuccess = (state = INITIAL_STATE, action ) => {
    const newUser = {
      ...state.user
      
    }
    
    Object.keys(action.user).forEach(key => {
      newUser[key] =  action.user[key] 
    })
    return {
        ...state,
        isSaving: false,
        user: newUser,
        saved: true
 
    }
}
  
export const updateProfileFailure = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSaving: false,
        error: true,
        errorMessage: action.error,
        saved: false
 
    }
}

export const updateProfileReset = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSaving: false,
        saved: false
 
    }
}
 
//*************************************


// *****createProfile******************

export const createProfileRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state, 
       isSaving:true,
       error: false, 
       errorMessage: '',
       saved: false 
    }
}
  
export const createProfileSuccess = (state = INITIAL_STATE, action ) => {
    const newUser = {
      ...state.user
      
    }
    
    Object.keys(action.user).forEach(key => {
      newUser[key] =  action.user[key] 
    })
    return {
        ...state,
        isSaving: false,
        user: newUser,
        saved: true
 
    }
}
  
export const createProfileFailure = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSaving: false,
        error: true,
        errorMessage: action.error,
        saved: false
 
    }
}

export const createProfileReset = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSaving: false,
        saved: false
 
    }
}
 
//*************************************************



export const destroyAuthSuccess = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSigningin: false, 
        isAuth: false,
        user: {} 
 
    }
}

// **** Fim do reducers do login ****
//Mapeando para qual action Types vai chamar cada reducer acima
export const HANDLERS = {
    [Types.SIGNIN_REQUEST]: signinRequest,
    [Types.SIGNIN_SUCCESS]: signinSuccess,
    [Types.SIGNIN_FAILURE]: signinFailure,
    
    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.AUTH_FAILURE]: authFailure,

    [Types.DESTROY_AUTH_SUCCESS]: destroyAuthSuccess,

    [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
    [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
    [Types.UPDATE_PROFILE_RESET]: updateProfileReset,

    [Types.CREATE_PROFILE_REQUEST]: createProfileRequest,
    [Types.CREATE_PROFILE_SUCCESS]: createProfileSuccess,
    [Types.CREATE_PROFILE_FAILURE]: createProfileFailure,
    [Types.CREATE_PROFILE_RESET]: createProfileReset

}

export default createReducer(INITIAL_STATE, HANDLERS)
