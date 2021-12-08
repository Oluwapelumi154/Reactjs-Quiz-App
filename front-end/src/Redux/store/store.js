import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../Slices/loginSlices';
import questionReducer from '../Slices/questionSlices'
import signUpReducer from '../Slices/signUpSlices'
const store=configureStore({
    reducer:{
    user:loginReducer,
    questions:questionReducer,
    signUp:signUpReducer
    }
})
export default store;