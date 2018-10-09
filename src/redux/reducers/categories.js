import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isLoading: false,
    data: [],
    saved: false,
    isSaving: false,
    category: {}

}

export const getCategoriesRequest = (state = INITIAL_STATE, action) => {
   
    return {
      ...state,
      isLoading:true
     
      
   }
}

export const getCategoriesSuccess = (state = INITIAL_STATE, action) => {
    return {
       ...state,
       isLoading:false,
       data: action.categories
       
    }
}

export const getCategoriesFailure = (state = INITIAL_STATE, action) => {
    return {
       ...state,
       isLoading:false
              
    }
}

//********** create run ******************

export const createCategoryRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state,
       isSaving:true
       
    }
}
 
export const createCategorySuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving:false,
        saved: true
              
    }
}
 
export const createCategoryFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving:false,
        saved: false
               
    }
}

export const createCategoryReset = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving:false,
        saved: false
               
    }
}
//*************************************

// ********** get Category(p/ o EDIT) ******************************************
export const getCategoryRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state,
       isLoading:true
       
    }
 }
 
 export const getCategorySuccess = (state = INITIAL_STATE, action) => {
     return {
        ...state,
        isLoading:false,
        category: action.category
        
     }
 }
 
 export const getCategoryFailure = (state = INITIAL_STATE, action) => {
     return {
        ...state,
        isLoading:false
               
     }
 }
 
 //********************************

//********** remove Category ******************
 
export const removeCategoryRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state,
       isSaving:true
       
    }
}

export const removeCategorySuccess = (state = INITIAL_STATE, action) => {
    const categories = [...state.data]
    const id = action.id
    const indexToDelete = categories.findIndex( category => category.id === id)
    categories.splice(indexToDelete, 1)
    
    return {
        ...state,
        isSaving:false,
        data: categories
       
              
    }
}
 
export const removeCategoryFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving:false
       
               
    }
}


//*************************************

// *****updateCategory**********************************

export const updateCategoryRequest = (state = INITIAL_STATE, action) => {
    return {
       ...state, 
       isSaving:true,
       error: false, 
       errorMessage: '',
       saved: false 
    }
}
  
export const updateCategorySuccess = (state = INITIAL_STATE, action ) => {
    const newCategory = {
      ...state.category
      
    }
    
    Object.keys(action.category).forEach(key => {
      newCategory[key] =  action.category[key] 
    })
    return {
        ...state,
        isSaving: false,
        category: newCategory,
        saved: true
 
    }
}
  
export const updateCategoryFailure = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSaving: false,
        error: true,
        errorMessage: action.error,
        saved: false
 
    }
}

export const updateCategoryReset = (state = INITIAL_STATE, action ) => {
    return {
        ...state,
        isSaving: false,
        saved: false
 
    }
}
 
//*************************************

export const HANDLERS = {
    [Types.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
    [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
    [Types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,
    
    [Types.CREATE_CATEGORY_REQUEST]: createCategoryRequest,
    [Types.CREATE_CATEGORY_SUCCESS]: createCategorySuccess,
    [Types.CREATE_CATEGORY_FAILURE]: createCategoryFailure,
    [Types.CREATE_CATEGORY_RESET]: createCategoryReset,

    [Types.REMOVE_CATEGORY_REQUEST]: removeCategoryRequest,
    [Types.REMOVE_CATEGORY_SUCCESS]: removeCategorySuccess,
    [Types.REMOVE_CATEGORY_FAILURE]: removeCategoryFailure,
    
    //******** base do edit user *************
    [Types.GET_CATEGORY_REQUEST]: getCategoryRequest,
    [Types.GET_CATEGORY_SUCCESS]: getCategorySuccess,
    [Types.GET_CATEGORY_FAILURE]: getCategoryFailure,
    
    [Types.UPDATE_CATEGORY_REQUEST]: updateCategoryRequest,
    [Types.UPDATE_CATEGORY_SUCCESS]: updateCategorySuccess,
    [Types.UPDATE_CATEGORY_FAILURE]: updateCategoryFailure,
    [Types.UPDATE_CATEGORY_RESET]: updateCategoryReset
    //*************************************** */


}
export default createReducer(INITIAL_STATE, HANDLERS)
