"use client";
import { all, put, call, takeEvery } from "redux-saga/effects";
import { reorderItems } from "./features/board/boardSlice";
import { disp } from "react-redux";

async function sendReorderItems1(items) {
	const res = await fetch("http://localhost:3000/api/kanban", {
		method: "POST",
		body: JSON.stringify(items),
		headers: {
			"content-type": "application/json",
		},
	});
	/* 	console.log("RESPONSE!!!!!!");
	console.log("RESPONSE", res.body;
	console.log("RESPONSE!!!!!!"); */
	const data = await res.json();
	return data;
}

function* sendReorderItems(action) {
	try {
		//	const res = sendReorderItems1(action.payload);
		//	console.log(res);
		const data = yield call(sendReorderItems1, action.payload);
		console.log("response", data);
		yield put(reorderItems({ board: data }));
		//dispatch(reorderItems(data));
	} catch (e) {
		yield put({ type: "SEND_ITEMS_FAILED", message: e.message });
	}
}

export default function* rootSaga() {
	yield takeEvery("SEND_ITEMS_ASYNC", sendReorderItems);
}
