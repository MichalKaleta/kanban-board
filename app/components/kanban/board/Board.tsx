"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { SortableTree, TreeItem } from "dnd-kit-sortable-tree";
import { TaskItemWrapper, AddButton } from "../taskItem";
import {
	useReorderItemMutation,
	useGetItemsQuery,
	useCreateItemMutation,
} from "@/store/boardApi";
import { TaskItem } from "../types";
import styles from "./Board.module.css";
import { useEffect } from "react";
import { flatArray, nestArray } from "@/lib/arrayHelpers";
import { Button } from "@/app/components/_common/Inputs";
import { EditModal } from "@/app/components/kanban/editModal/EditModal";

export const Board = (props: { initialItems: TaskItem[] }) => {
	const [items, setItems] = useState<TaskItem[]>(props.initialItems);
	const [addNewItemModal, setAddNewItemModal] = useState<boolean>(false);

	const [sendReorderedItems, results] = useReorderItemMutation();
	const { data, isFetching, isLoading } = useGetItemsQuery();

	useEffect(() => {
		setItems(data);
	}, [data]);

	const handleItemchange = (newOrder: TreeItem<Record<string, any>>[]) => {
		const newOrderFlat = flatArray(newOrder);
		setItems(newOrderFlat);
		sendReorderedItems(newOrderFlat);
	};
	/*TO DO: TOO MUCH RERENDERS
	console.log("RERENDER");
	const renderItemsData = items; */

	const BoardList = ({ index = 0 }) => (
		<ul className={styles.list} tabIndex={0}>
			{items && items.length > 0 && (
				<SortableTree
					items={nestArray(items).filter(
						(item: TaskItem) => item.column === index
					)}
					onItemsChanged={(newOrder) => handleItemchange(newOrder)}
					indentationWidth={32}
					//@ts-ignore
					TreeItemComponent={TaskItemWrapper}
				/>
			)}
		</ul>
	);
	const boardClass = clsx(styles.board, isFetching && styles.board_fetching);
	return (
		items && (
			<div className={boardClass}>
				<Button
					text="Add item"
					handleClick={() => setAddNewItemModal(true)}
				/>
				<BoardList index={0} />
				{/* <BoardList index={1} /> */}
				{addNewItemModal &&
					createPortal(
						<EditModal setEditMode={setAddNewItemModal} />,
						window.document.body
					)}
			</div>
		)
	);
};
