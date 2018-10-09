// Disparador das actions
import { createActions } from 'reduxsauce'

export const {
    Types,
    Creators
} = createActions({
    signinRequest: ['email','passwd'], //qdo desejar logar
    signinSuccess: ['user'], //caso deu certo chamar o Success
    signinFailure: ['error'], //caso deu errado chamar o Failure

    authRequest: null, // passar null pois vai verificar no localStorage
                       // se está logado
    authSuccess: ['user'], // se deu certo retorna o usuario
    authFailure: null, // se deu algo errado retorna null

    destroyAuthRequest: null,
    destroyAuthSuccess: null,
    
    getCategoriesRequest: ['admin'],
    getCategoriesSuccess: ['categories'],
    getCategoriesFailure: null,

    createCategoryReset: null,
    createCategoryRequest: ['category'],
    createCategorySuccess: ['category'],
    createCategoryFailure: ['error'],

    removeCategoryRequest: ['id'],
    removeCategorySuccess: ['id'],
    removeCategoryFailure: ['error'],

    getCategoryRequest: ['id'],
    getCategorySuccess: ['category'],
    getCategoryFailure: null,


    getRunsRequest: ['admin'],
    getRunsSuccess: ['runs'],
    getRunsFailure: null,

    getUsersRequest: null,
    getUsersSuccess: ['users'],
    getUsersFailure: null,

    //para o Editar o User 
    getUserRequest: ['id'],
    getUserSuccess: ['user'],
    getUserFailure: null,
    
    createRunReset: null,
    createRunRequest: ['run'],
    createRunSuccess: ['run'],
    createRunFailure: ['error'],

    removeRunRequest: ['id'],
    removeRunSuccess: ['id'],
    removeRunFailure: ['error'],

    removeUserRequest: ['id'],
    removeUserSuccess: ['id'],
    removeUserFailure: ['error'],

    updateProfileReset: null,
    updateProfileRequest: ['user'],
    updateProfileSuccess: ['user'],
    updateProfileFailure: ['error'],

    updateUserReset: null,
    updateUserRequest: ['user'],
    updateUserSuccess: ['user'],
    updateUserFailure: ['error'],

    updateCategoryReset: null,
    updateCategoryRequest: ['category'],
    updateCategorySuccess: ['category'],
    updateCategoryFailure: ['error'],

    createProfileReset: null,
    createProfileRequest: ['user'],
    createProfileSuccess: ['user'],
    createProfileFailure: ['error']



})

export default Creators