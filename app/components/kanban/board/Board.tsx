"use client";
import { useSelector, useDispatch } from "react-redux";
import { SortableTree } from "dnd-kit-sortable-tree";
import { TaskItemWrapper, AddButton } from "../taskItem";
import { useReorderItemMutation, useGetItemsQuery } from "@/store/boardApi";
import { TaskItem } from "../types";
import styles from "./Board.module.css";
import { reorderItems } from "@/store/boardSlice";
import { useEffect } from "react";
import type { RootState } from "@/store/store";
import { flatArray, nestArray } from "@/lib/arrayHelpers";
import { reorderItemsInDb } from "@/lib/prisma";

export const Board = (props: { initialItems: TaskItem[] }) => {
	const dispatch = useDispatch();
	const [sendReorderedItems, results] = useReorderItemMutation();
	const { data, isFetching } = useGetItemsQuery();

	useEffect(() => {
		dispatch(reorderItems(data || props.initialItems));
	}, [props.initialItems, data]);

	const items = useSelector((state: RootState) => state.board);

	const BoardList = ({ index = 0 }) => (
		<ul
			className={styles.list}
			/* onKeyDown={handleKeyDown} */
			tabIndex={0}
		>
			<button
				onClick={async () => {
					await sendReorderedItems(items);
				}}
			>
				send test items
			</button>
			{items && items.length > 0 && (
				<SortableTree
					items={nestArray(items).filter(
						(item: TaskItem) => item.column === index
					)}
					onItemsChanged={async (newOrder) => {
						const newOrderFlat = flatArray(newOrder);
						dispatch(reorderItems(newOrderFlat));
						await sendReorderedItems(newOrderFlat);
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
