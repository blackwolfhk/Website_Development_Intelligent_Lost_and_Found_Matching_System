import { createAction } from "@reduxjs/toolkit";

const loginAction = createAction<boolean>('auth/checking')
const postAction = createAction<string>('auth/getPost')
// const markerShowAction = createAction<boolean>('marker/show')
// const updateProfileAction = createAction<string>('auth/updateProfile')


export { loginAction, postAction }