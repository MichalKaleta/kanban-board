import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addItem,
	changeItemValue,
	removeItem,
} from "../../../../lib/features/board/boardSlice";
import { Input, Button } from "../../_common/Inputs";
import { EditModalProps } from "../types";
import styles from "./EditModal.module.css";

export const EditModal = (props: EditModalProps) => {
	const { initValue, id, setEditMode } = props;

	const dispatch = useDispatch();
	//const textInput = useRef<HTMLInputElement | null>(null);
	//textInput.current && textInput.current.focus();
	const [value, setValue] = useState<string>("");

	function handlSubmitValue() {
		console.log(value, id);
		dispatch(changeItemValue({ value, id }));
		setEditMode(false);
		setValue("");
	}

	return (
		<div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
			<div className={styles.wrapper}>
				<form onClick={(e) => e.stopPropagation()}>
					<Input
						//autoFocus={true}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						defaultValue={initValue || ""}
						value={value}
					/>
					{/* 	<textarea
						//@ts-ignore
						//ref={textInput}
						className={styles.input}
						defaultValue={initValue || ""}
					/> */}
					<Button text="OK" onClick={handlSubmitValue} />
				</form>
				<button
					type="button"
					onClick={(e) => {
						dispatch(addItem(id));
					}}
				>
					subtask
				</button>
			</div>
			;
		</div>
	);
};
