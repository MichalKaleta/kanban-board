import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input, Button } from "@/app/components/_common/Inputs";
import { useCreateItemMutation } from "@/store/store";
import { EditModalProps, TaskItem } from "../types";
import styles from "./EditModal.module.css";

//const textInput = useRef<HTMLInputElement | null>(null);
//textInput.current && textInput.current.focus();

export const EditModal = (props: EditModalProps) => {
	const { initValue = "", id = uuidv4(), setEditMode } = props;

	const [value, setValue] = useState<string>("");
	const [sendNewItem] = useCreateItemMutation();

	const item: TaskItem = {
		id,
		value,
		parentId: null,
		parent: null,
		column: 0,
		userId: "1",
		children: null,
		index: 2,
		isLast: false,
		depth: 0,
	};

	return (
		<div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
			<div className={styles.wrapper}>
				<form onClick={(e) => e.stopPropagation()}>
					<Input
						onChange={(e) => {
							setValue(e.target.value);
						}}
						value={value || initValue}
						textArea={true}
						placeholder="Enter text..."
					/>
					<Button
						text="OK"
						handleClick={() => {
							setEditMode(false);
							sendNewItem(item);
						}}
					/>
				</form>
			</div>
			;
		</div>
	);
};
