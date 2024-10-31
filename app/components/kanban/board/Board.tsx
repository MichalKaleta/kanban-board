"use client";
import { useSelector, useDispatch } from "react-redux";
import { SortableTree } from "dnd-kit-sortable-tree";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorBoundaryDisplay } from "../../_common/ErrorBoundryDisplay";
import {
  reorderItems,
  undo,
  redo,
} from "../../../../lib/features/board/boardSlice";
import { TaskItemWrapper, AddButton } from "../taskItem";
import { TaskItem } from "../types";
import styles from "./Board.module.css";

export const Board = (props: { items: TaskItem[] }) => {
  const { items } = props;

  const dispatch = useDispatch();
  const items2 = useSelector((state) => state.board);

  const items3 = items2.board?.length > 0 ? items2.board : items;
  console.log("IT$MR", items2?.length, items2);

  function hadleItemsChanged(newOrder) {
    dispatch({ type: "SEND_ITEMS_ASYNC", payload: newOrder });
  }

  const BoardList = ({ index = 0 }) => (
    <ul className={styles.list} /* onKeyDown={handleKeyDown} */ tabIndex={0}>
      {items3.length && (
        <SortableTree
          items={items3.filter(({ column }) => column === index)}
          onItemsChanged={(newOrder) => hadleItemsChanged(newOrder)}
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
