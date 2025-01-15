import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeItemValue, removeItem } from "@/store/boardSlice";
import { EditModal } from "../editModal/EditModal";
import { Trash, Pencil } from "@/assets/icons";
import styles from "./TaskItem.module.css";
import { TaskItemProps } from "../types";
import { AddButtonProps, TaskItemWrapperProps } from "../types";

export const TaskItem = (props: TaskItemProps) => {
	let { completed, item } = props;
	const [editMode, setEditMode] = useState<boolean>(false);
	const dispatch = useDispatch();

	return (
		<>
			<div
				className={
					completed
						? [styles.inner_complete, styles.inner].join(" ")
						: styles.inner
				}
			>
				<div>{item.value}</div>
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

			{editMode &&
				createPortal(
					<EditModal
						initValue={item.value}
						id={item.id}
						setEditMode={setEditMode}
					/>,
					window.document.body
				)}
		</>
	);
};
