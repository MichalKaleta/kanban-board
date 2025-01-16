export type TaskItem = {
	id: string;
	value: string;
	parent: string | null;
	parentId: string | null;
	column: number;
	userId: string;
	children: TaskItem[] | null;
};

export type TaskItemWrapperProps = {
	removeItem: (id: string) => void;
	addItem: (parent: string) => void;
	item: TaskItem;
	isLast: boolean;
	depth: number;
};
export type TaskItemProps = {
	item: TaskItem;
	completed: boolean;
};

export type EditModalProps = {
	id?: string;
	initValue?: string;
	setEditMode: (editMode: boolean) => void;
};

export type AddButtonProps = {
	onClickhandler: () => void;
	depth?: number;
	text?: string;
};
