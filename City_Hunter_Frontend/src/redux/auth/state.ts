export interface IAuthState {
    isLoggedIn: boolean
    displayName: string
    role: string;
    username: string;
    email: string
    mobile_no: string
}
export interface IRootState {
    auth: IAuthState
}

export interface MyJwtPayload {
    role: string;
    userId: number;
    username: string;
    email: string
    mobile_no: string
}

