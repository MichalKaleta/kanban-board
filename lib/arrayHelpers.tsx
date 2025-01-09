// @ts-nocheck
export function nestArray(items, id = null, link = "parentId") {
	return items
		?.filter((item) => item[link] == id)
		.map((item) => ({
			...item,
			children: nestArray(items, item.id, link),
		}));
}

export function flatArray(a) {
	var result = [];
	for (let e of a) {
		const children = e.children;
		result.push({ ...e, children: null });
		result = result.concat(flatArray(children));
	}

	return result;
}
