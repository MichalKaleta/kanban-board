import prisma from "@/lib/prisma";

const arr = prisma.items.findMany();
console.log(arr);
