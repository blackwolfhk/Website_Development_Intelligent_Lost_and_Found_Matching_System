import { IAuthState } from "./auth/state"
import { IPostState } from "./post/state"

export interface IRootState {
    auth: IAuthState
    post: IPostState
}