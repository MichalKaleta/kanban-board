import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	changeItemValue,
	removeItem,
} from "../../../../lib/features/board/boardSlice";
import { EditModal } from "../editModal/EditModal";
import { Trash, Pencil } from "../../../../assets/icons";
import styles from "./TaskItem.module.css";
import { TaskItemProps } from "../types";

export const TaskItem = (props: TaskItemProps) => {
	let { completed, item } = props;

	const [editMode, setEditMode] = useState<boolean>(false);

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
				createPortal(
					<EditModal
						initValue={item.value}
						id={item.id}
						setEditMode={setEditMode}
					/>,
					document.body
				)
			)}

			{!completed && (
				<div className={styles.options}>
					<button
						disabled={editMode}
						onClick={(e) => {
							e.stopPropagation();
							setEditMode(true);
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
