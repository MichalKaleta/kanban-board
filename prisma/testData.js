const testUserItems = {
	board: [
		{
			id: "1",
			value: "dress youself for gods sake!",
			parentId: null,
			column: 0,
			userId: "1",
		},
		{
			id: "2",
			value: "put some pants on",
			parentId: "1",
			column: 0,
			userId: "1",
		},
		{
			id: "3",
			value: "put sweater on",
			parentId: "1",
			column: 0,
			userId: "1",
		},
		{
			id: "4",
			value: "first put on a shirt ",
			parentId: "3",
			column: 0,
			userId: "1",
		},
		{
			id: "11",
			value: "make burgers",
			parentId: null,
			column: 1,
			userId: "1",
		},
		{
			id: "12",
			value: "grill meat",
			parentId: "11",
			column: 1,
			userId: "1",
		},
	],
};

async function addTestUser() {
	await prisma.user.deleteMany();
	await prisma.items.deleteMany();
	const user = await prisma.user.create({
		data: { login: "test_user", id: "1" },
	});
	const items = await prisma.items.createMany({
		data: testUserItems,
	});
	console.log(items);
}

addTestUser();
