import type { Action, ThunkAction } from "@reduxjs/toolkit";
import {
	combineReducers,
	combineSlices,
	configureStore,
} from "@reduxjs/toolkit";
import { boardSlice } from "./boardSlice";
import { boardApi, useReorderItemMutation } from "./boardApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineSlices(boardSlice, {
	[boardApi.reducerPath]: boardApi.reducer,
});

const makeStore = () => {
	return configureStore({
		reducer: rootReducer,

		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(boardApi.middleware);
		},
	});
};
export const store = makeStore();

setupListeners(store.dispatch);

export { boardApi, useReorderItemMutation };
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
