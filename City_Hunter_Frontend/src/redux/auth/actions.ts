import { createAction } from "@reduxjs/toolkit";

const loginAction = createAction<boolean>('auth/checking')
const postAction = createAction<string>('auth/getPost')
// const updateProfileAction = createAction<string>('auth/updateProfile')


export { loginAction, postAction }