import { createReducer } from "@reduxjs/toolkit";
import { ITestState } from "./state";

const initialState: ITestState = {
  name: "Veronica Testing",
};

const rootReducer = createReducer(initialState, (builder) => { });

export default rootReducer;
