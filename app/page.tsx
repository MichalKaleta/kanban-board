import type { Metadata } from "next";
import { Board } from "./components/kanban/board/Board";

export default function IndexPage() {
  return <Board />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
