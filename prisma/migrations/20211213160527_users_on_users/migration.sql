-- CreateTable
CREATE TABLE "UsersOnUsers" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL,

    CONSTRAINT "UsersOnUsers_pkey" PRIMARY KEY ("id")
);
