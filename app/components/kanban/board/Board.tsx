"use client";
import { useSelector, useDispatch } from "react-redux";
import { SortableTree } from "dnd-kit-sortable-tree";
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

  const BoardList = ({ index = 0 }) => (
    <ul className={styles.list} onKeyDown={handleKeyDown} tabIndex={0}>
      {items.length && (
        <SortableTree
          items={items.filter(({ column }) => column === index)}
          onItemsChanged={(newOrder) => dispatch(reorderItems(newOrder))}
          indentationWidth={32}
          //@ts-ignore
          TreeItemComponent={TaskItemWrapper}
        />
      )}
    </ul>
  );

  return (
    <div className={styles.board}>
      <BoardList index={0} />
      <BoardList index={1} />
    </div>
  );
};
