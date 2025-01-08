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
		result.push({ ...e });

		result = result.concat(flatArray(e.children));
	}

	return result;
}
