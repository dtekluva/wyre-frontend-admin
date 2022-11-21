import { combineReducers } from "redux"
import authReducer from "./auth/auth.reducer"
import clientReducer from "./clients/client.reducer"

const rootReducers = combineReducers({
  auth: authReducer,
  client: clientReducer
})

export default rootReducers