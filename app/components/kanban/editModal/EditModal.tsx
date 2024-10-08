import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addItem,
	changeItemValue,
	removeItem,
} from "../../../../lib/features/board/boardSlice";
import { EditModalProps } from "../types";
import styles from "./EditModal.module.css";

export const EditModal = (props: EditModalProps) => {
	const { initValue, id, setEditMode } = props;

	const dispatch = useDispatch();
	const textInput = useRef<HTMLInputElement | null>(null);
	textInput.current && textInput.current.focus();
	const [value, setValue] = useState<string>("");

	function handlSubmitValue(value: string, id: string) {
		setEditMode(false);
		//setValue("");

		console.log(value, id);
		dispatch(changeItemValue({ value, id }));
	}
	return (
		<div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
			<div className={styles.wrapper}>
				<textarea
					//@ts-ignore
					ref={textInput}
					className={styles.input}
					defaultValue={initValue || ""}

					/* 	onChange={(e) => {
						e.stopPropagation();
						setValue(e.target.value);
					}} */
				/>
				<button
					onClick={(e) => {
						//e.stopPropagation();
						handlSubmitValue(value, id);
					}}
				>
					OK
				</button>
				<div
					onClick={(e) => {
						//e.stopPropagation();
						dispatch(addItem(id));
					}}
				>
					subtask
				</div>
			</div>
			;
		</div>
	);
};
