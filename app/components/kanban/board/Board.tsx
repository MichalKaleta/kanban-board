"use client";
import { useSelector, useDispatch } from "react-redux";
import { SortableTree } from "dnd-kit-sortable-tree";
import { TaskItemWrapper, AddButton } from "../taskItem";
import { useReorderItemMutation, useGetItemsQuery } from "@/app/store/boardApi";
import { TaskItem } from "../types";
import styles from "./Board.module.css";
import { reorderItems } from "@/app/store/boardSlice";
import { useEffect } from "react";

export const Board = (props: { initialItems: TaskItem[] }) => {
	const dispatch = useDispatch();
	const [sendReorderedItems, results] = useReorderItemMutation();
	const { data, isFetching } = useGetItemsQuery();
	console.log("NEW DATA ARRIVED:  ", data);

	useEffect(() => {
		dispatch(reorderItems(props.initialItems));
	}, [props.initialItems]);

	const items = useSelector((state) => state.board);

	const BoardList = ({ index = 0 }) => (
		<ul
			className={styles.list}
			/* onKeyDown={handleKeyDown} */ tabIndex={0}
		>
			{items && (
				<SortableTree
					items={items.filter(({ column }) => column === index)}
					onItemsChanged={async (newOrder) => {
						dispatch(reorderItems(newOrder));
						await sendReorderedItems(newOrder);
					}}
					indentationWidth={32}
					//@ts-ignore
					TreeItemComponent={TaskItemWrapper}
				/>
			)}
		</ul>
	);

	return (
		/*     <ErrorBoundary errorComponent={ErrorBoundaryDisplay}> */
		<div className={styles.board}>
			<BoardList index={0} />
			<BoardList index={1} />
		</div>
		/* s */
	);
};
