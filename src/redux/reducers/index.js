import { combineReducers } from "redux"
import authReducer from "./auth/auth.reducer"
import clientReducer from "./clients/client.reducer"
import deviceReducer from "./devices/device.reducer"
import branchesReducer from "./branches/branches.reducer"

const rootReducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  branches: branchesReducer,
  device: deviceReducer
})

export default rootReducers