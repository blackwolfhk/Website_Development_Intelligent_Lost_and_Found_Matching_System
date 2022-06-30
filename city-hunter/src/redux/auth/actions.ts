import { createAction } from "@reduxjs/toolkit";

const loginAction = createAction<boolean>('auth/checking')

export { loginAction }