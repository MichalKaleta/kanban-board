-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "parent" TEXT,
    "parentId" TEXT,
    "column" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "children" INTEGER,
    "depth" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "isLast" BOOLEAN NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
