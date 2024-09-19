// @ts-nocheck
import { createSlice, current,buildCreateSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BoardInterface } from "../types";
import { flatArray, nestArray } from "../../arrayHelpers";

const localSave = JSON.parse(localStorage.getItem("items"));

const initialState: BoardInterface | Record<string, never> = nestArray(
	localSave || [
		{
			id: "1",
			value: "do stuff",
			parentId: "",
		},
		{
			id: "2",
			value: "do smaller stuff",
			parentId: "1",
		},
	]
);

const history = [...initialState];
let currentIndex = 0;

function addToHistory(newEntry) {
	currentIndex = currentIndex + 1;
	history[currentIndex] = newEntry;
	localStorage.setItem("items", JSON.stringify(newEntry));
}

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		addItem(state, action) {
			const items = [...current(state)];
			const { parentId } = action.payload;
			const newItem = { id: uuidv4(), value: "write something" };

			if (parentId !== null) {
				newItem.parentId = parentId;
			}
			let newItems = flatArray(items);
			newItems.push(newItem);
			let a = nestArray(newItems);
			addToHistory(a);
			return a;
		},

		removeItem(state, action) {
			const items = [...current(state)];

			const id = action.payload;

			const newItems = flatArray(items).filter((item) => item.id != id);
			let a = nestArray(newItems);
			addToHistory(a);
			return a;
		},
		changeItemValue(state, action) {
			const items = [...current(state)];
			const { value, id } = action.payload;
			const newVal = flatArray(items).map((item) => {
				if (item.id == id) {
					item.value = value;
				}
				return item;
			});
			let a = nestArray(newVal);
			addToHistory(a);
			return a;
		},
		reorderItems(state, action) {
			return action.payload;
		},
		undo() {
			currentIndex = currentIndex - 1;
			const formerState = history[currentIndex];
			return formerState;
		},
		redo() {
			if (history.length > currentIndex) {
				currentIndex = currentIndex + 1;
				const formerState = history[currentIndex];
				return formerState;
			}
		},
	},
});

export const {
	removeItem,
	changeItemValue,
	addItem,
	reorderItems,
	undo,
	redo,
} = boardSlice.actions;

console.log(boardSlice)
export  const boardReducer = boardSlice.reducer ;
