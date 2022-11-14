import { combineReducers } from "redux"
import authReducer from "./auth/auth.reducer"

const rootReducers = combineReducers({
  auth: authReducer
})

export default rootReducers