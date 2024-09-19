import "./TaskItem.scss";
import { Trash, Pencil } from "../../../../../kanban2/src/assets/icons";
import { useState, useRef, forwardRef } from "react";
import { SimpleTreeItemWrapper } from "dnd-kit-sortable-tree";

interface AddButtonProps {
	onClickhandler: () => void;
	depth?: number;
	text?: string;
}

export const AddButton = ({
	onClickhandler,
	depth = 1,
	text,
}: AddButtonProps) => (
	<button
		style={{ marginLeft: depth * 16 + "px" }}
		className="task-item__add"
		onClick={onClickhandler}
	>
		{`${text || "+ Add a Card"}`}
	</button>
);

interface TaskItemProps {
	removeItem: (id: string) => void;
	addItem: (parentId: string) => void;
	item: { id: string; value: string; parentId: string };
	isLast: boolean;
	depth: number;
	changeItemValue: (value: string, id: string) => string;
}

export const TaskItem = forwardRef((props: TaskItemProps, taskItemRef) => {
	let { removeItem, addItem, item, isLast, depth, changeItemValue } = props;
	const textInput = useRef<HTMLInputElement | null>(null);

	const [editMode, setEditMode] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");
	const [completeTasks, setCompleteTasks] = useState<string[]>([]);

	function editItemContent(oldValue: string): void {
		setEditMode(true);
		setValue(oldValue);
	}

	textInput.current && textInput.current.focus();

	function handlSubmitValue(value: string, id: string) {
		setEditMode(false);
		setValue("");
		changeItemValue(value, id);
	}

	const completed = completeTasks.includes(item.id);

	return (
		<>
			<SimpleTreeItemWrapper
				{...props}
				//@ts-ignore
				ref={taskItemRef}
				showDragHandle={false}
				className="task-item__wrapper"
				contentClassName={"task-item__content"}
				hideCollapseButton={true}
				indentationWidth={16}
				collapsed={false}
				onClick={(e: Event) => {
					e.stopPropagation();
					setCompleteTasks((completeTasks) => {
						//TODO: parent should complete all children
						//TODO:
						const a = [...completeTasks];
						if (completeTasks.includes(item.id)) {
							const ix = a.indexOf(item.id);
							a.splice(ix, 1);
						} else {
							a.push(item.id);
						}
						return a;
					});
				}}
				onCollapse={() => null}
			>
				<div
					className={`task-item__inner  ${
						completeTasks.includes(item.id) &&
						"task-item__inner--complete"
					}`}
				>
					{!editMode ? (
						//TODO: style edit mode, stop propagations,  maybe edit in modal
						<div>{item.value}</div>
					) : (
						<>
							<textarea
								//@ts-ignore
								ref={textInput}
								className={"task-item__input"}
								value={value || ""}
								onChange={(e) => {
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
									addItem(item.id);
								}}
							>
								subtask
							</div>
						</>
					)}
					{!completed && (
						<div className="task-item__options">
							<button
								disabled={editMode}
								onClick={(e) => {
									e.stopPropagation();
									editItemContent(item.value);
								}}
							>
								<Pencil />
							</button>
							<button onClick={() => removeItem(item.id)}>
								<Trash />
							</button>
						</div>
					)}
				</div>
			</SimpleTreeItemWrapper>

			{isLast && (
				<AddButton
					onClickhandler={() => addItem(item.id)}
					depth={depth}
				/>
			)}
		</>
	);
});
