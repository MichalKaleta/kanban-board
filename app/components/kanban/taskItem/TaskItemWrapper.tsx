"use client";
import React, { useState, useRef, forwardRef } from "react";
import { SimpleTreeItemWrapper } from "dnd-kit-sortable-tree";
import styles from "./TaskItem.module.css";
import { TaskItem } from "./TaskItem";
import { AddButtonProps, TaskItemWrapperProps } from "../types";

export const AddButton = ({
	onClickhandler,
	depth = 1,
	text,
}: AddButtonProps) => (
	<button
		style={{ marginLeft: depth * 32 + "px" }}
		className={styles.add}
		onClick={onClickhandler}
	>
		{`${text || "+ Add a Card"}`}
	</button>
);

export const TaskItemWrapper = forwardRef(
	(props: TaskItemWrapperProps, taskItemRef) => {
		let { item, isLast, depth } = props;
		const textInput = useRef<HTMLInputElement | null>(null);

		const [completeTasks, setCompleteTasks] = useState<string[]>([]);

		textInput.current && textInput.current.focus();

		//TODO: parent should complete all children
		function handleComplitingTask(e: Event) {
			e.stopPropagation();
			let copy = [...completeTasks];
			const index = copy.indexOf(item.id);
			index >= 0 ? copy.splice(index, 1) : copy.push(item.id);
			setCompleteTasks(copy);
		}

		const completed = completeTasks.includes(item.id);

		return (
			<>
				<SimpleTreeItemWrapper
					{...props}
					//@ts-ignore
					ref={taskItemRef}
					showDragHandle={false}
					className={styles.wrapper}
					contentClassName={styles.content}
					hideCollapseButton={true}
					indentationWidth={64}
					collapsed={false}
					onClick={(e: Event) => {
						handleComplitingTask(e);
					}}
					onRemove={() => console.log("DAFASDF")}
					//onCollapse={() => null}
				>
					<div className={styles.wrapper}>
						<TaskItem item={item} completed={completed} />
					</div>
				</SimpleTreeItemWrapper>
				{isLast && (
					<AddButton
						onClickhandler={() => null /* addItem(item.id) */}
						depth={depth}
					/>
				)}
			</>
		);
	}
);
