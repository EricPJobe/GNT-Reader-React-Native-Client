import { createStore } from '@reduxjs/toolkit'
import referenceReducer from "./reference-reducer";

const store = createStore(referenceReducer);

export default store;
