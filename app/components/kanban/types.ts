export type TaskItem = {
	id: string;
	value: string;
	parentId: string;
	column: number;
	userId: string;
};

export type TaskItemWrapperProps = {
	removeItem: (id: string) => void;
	addItem: (parentId: string) => void;
	item: TaskItem;
	isLast: boolean;
	depth: number;
};
export type TaskItemProps = {
	item: TaskItem;
	completed: boolean;
};

export type EditModalProps = {
	initValue: string;
	id: string;
	setEditMode: (editMode: boolean) => void;
};

export type AddButtonProps = {
	onClickhandler: () => void;
	depth?: number;
	text?: string;
};
