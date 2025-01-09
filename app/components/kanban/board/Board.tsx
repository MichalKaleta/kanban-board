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
import { testInitialItems, testSendItems } from "@/prisma/testData";

export const Board = (props: { initialItems: TaskItem[] }) => {
	const dispatch = useDispatch();
	const [sendReorderedItems, results] = useReorderItemMutation();
	const { data: items, isFetching, isLoading } = useGetItemsQuery();
	console.log("data: ", items, "fetcng:  ", isFetching);
	/* 	useEffect(() => {
		dispatch(reorderItems(data || props.initialItems));
	}, [props.initialItems, data]); */

	//useSelector((state: RootState) => state.board);

	const BoardList = ({ index = 0 }) => (
		<ul
			className={styles.list}
			/* onKeyDown={handleKeyDown} */
			tabIndex={0}
		>
			{items.length > 0 && (
				<SortableTree
					items={nestArray(items).filter(
						(item: TaskItem) => item.column === index
					)}
					onItemsChanged={(newOrder) => {
						//dispatch(reorderItems(newOrderFlat));
						sendReorderedItems(flatArray(newOrder));
					}}
					indentationWidth={32}
					//@ts-ignore
					TreeItemComponent={TaskItemWrapper}
				/>
			)}
		</ul>
	);

	return (
		<>
			{isFetching && "Fetching"}
			{isLoading && "Loadnig"}
			{items && !isFetching && !isLoading && (
				<div className={styles.board}>
					<BoardList index={0} />
					<BoardList index={1} />
				</div>
			)}
		</>
	);
};
