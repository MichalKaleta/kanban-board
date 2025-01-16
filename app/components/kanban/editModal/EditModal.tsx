import { uuid } from "drizzle-orm/pg-core";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addItem,
	changeItemValue,
	removeItem,
} from "../../../../store/boardSlice";
import { Input, Button } from "@/app/components/_common/Inputs";
import { EditModalProps } from "../types";
import { useCreateItemMutation } from "@/store/store";
import styles from "./EditModal.module.css";
//const textInput = useRef<HTMLInputElement | null>(null);
//textInput.current && textInput.current.focus();

export const EditModal = (props: EditModalProps) => {
	const { initValue = "", id = uuid(), setEditMode } = props;

	const [value, setValue] = useState<string>("");
	const item = {
		id,
		value,
		parentId: null,
		parent: null,
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
						onClick={(e) => {
							useCreateItemMutation(item);
							setEditMode(false);
						}}
					/>
				</form>
			</div>
			;
		</div>
	);
};
