"use client";
import { SortableTree } from "dnd-kit-sortable-tree";
import { useSelector, useDispatch } from "react-redux";
import {
	removeItem,
	addItem,
	changeItemValue,
	reorderItems,
	undo,
	redo,
} from "../../../../lib/features/board/boardSlice";
import { TaskItem, AddButton } from "../taskItem";
import "./Board.scss";

//BoardInterface[]
export const Board = () => {
	const items = useSelector(
		(state: { board }) =>{ 
            
            console.log(state)
            return state.board}
	);
	const dispatch = useDispatch();

	function handleKeyDown(pressed: React.KeyboardEvent) {
		const { ctrlKey, key } = pressed;
		if (ctrlKey) {
			if (key === "z") {
				dispatch(undo());
			} else if (key === "y") {
				dispatch(redo());
			}
		}
	}

	return (
		<ul className="board__container" onKeyDown={handleKeyDown} tabIndex={0}>
			{items.length ? (
				<SortableTree
					items={items}
					onItemsChanged={(newOrder) =>
						dispatch(reorderItems(newOrder))
					}
					//@ts-ignore
					TreeItemComponent={TaskItem}
					addItem={(parentId: string) => dispatch(addItem(parentId))}
					removeItem={(id: string) => {
						dispatch(removeItem(id));
					}}
					changeItemValue={(value: string, id: string) =>
						dispatch(changeItemValue({ value, id }))
					}
				/>
			) : (
				<AddButton
					onClickhandler={() =>
						dispatch(addItem({ id: null, parentId: null }))
					}
				/>
			)}
		</ul>
	);
};
