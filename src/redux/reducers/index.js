import { combineReducers } from "redux"
import authReducer from "./auth/auth.reducer"
import clientReducer from "./clients/client.reducer"
import deviceReducer from "./devices/device.reducer"
import viewBranchesReducer from "./viewBranches/viewBranches.reducer"

const rootReducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  viewBranches: viewBranchesReducer,
  device: deviceReducer
})

export default rootReducers