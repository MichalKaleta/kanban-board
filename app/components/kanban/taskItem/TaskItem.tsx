import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	changeItemValue,
	removeItem,
} from "../../../../lib/features/board/boardSlice";
import { Trash, Pencil } from "../../../../assets/icons";
import styles from "./TaskItem.module.css";
import { TaskItemProps } from "../types";

export const TaskItem = (props: TaskItemProps) => {
	let { completed, item } = props;
	const textInput = useRef<HTMLInputElement | null>(null);

	const [editMode, setEditMode] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	const dispatch = useDispatch();

	function editItemContent(oldValue: string): void {
		setEditMode(true);
		setValue(oldValue);
	}

	textInput.current && textInput.current.focus();

	function handlSubmitValue(value: string, id: string) {
		setEditMode(false);
		setValue("");
		dispatch(changeItemValue({ value, id }));
	}
	//das
	return (
		<div
			className={
				completed
					? [styles.inner_complete, styles.inner].join(" ")
					: styles.inner
			}
		>
			{!editMode ? (
				//TODO: style edit mode, stop propagations,  maybe edit in modal
				<div>{item.value}</div>
			) : (
				<>
					<textarea
						//@ts-ignore
						ref={textInput}
						className={styles.input}
						value={value || ""}
						onClick={(e) => {
							e.stopPropagation();
						}}
						onChange={(e) => {
							e.stopPropagation();
							setValue(e.target.value);
						}}
					/>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handlSubmitValue(value, item.id);
						}}
					>
						OK
					</button>
					<div
						onClick={(e) => {
							e.stopPropagation();
							//addItem(item.id);
						}}
					>
						subtask
					</div>
				</>
			)}
			{!completed && (
				<div className={styles.options}>
					<button
						disabled={editMode}
						onClick={(e) => {
							e.stopPropagation();
							editItemContent(item.value);
						}}
					>
						<Pencil />
					</button>
					<button onClick={() => dispatch(removeItem(item.id))}>
						<Trash />
					</button>
				</div>
			)}
		</div>
	);
};
