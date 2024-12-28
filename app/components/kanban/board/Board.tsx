"use client";
import { useSelector, useDispatch } from "react-redux";
import { SortableTree } from "dnd-kit-sortable-tree";
import { TaskItemWrapper, AddButton } from "../taskItem";
import { useReorderItemMutation } from "@/app/store/boardApi";
import { TaskItem } from "../types";
import styles from "./Board.module.css";
import { reorderItems } from "@/app/store/boardSlice";

export const Board = (props: { items: TaskItem[] }) => {
	const { items } = props;

	const dispatch = useDispatch();
	const [sendReorderedItems, results] = useReorderItemMutation();

	const items2 = useSelector((state) => state);

	const items3 = items2?.board?.length > 0 ? items2?.board : items;

	const BoardList = ({ index = 0 }) => (
		<ul
			className={styles.list}
			/* onKeyDown={handleKeyDown} */ tabIndex={0}
		>
			{items3.length && (
				<SortableTree
					items={items3.filter(({ column }) => column === index)}
					onItemsChanged={(newOrder) =>
						sendReorderedItems(newOrder).then((res) => {
							dispatch(reorderItems(res.data));
						})
					}
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
