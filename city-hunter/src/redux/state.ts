import { IAuthState } from "./auth/state"
import { ITestState } from "./test/state"

export interface IRootState {
    test: IAuthState,
    auth: IAuthState
}