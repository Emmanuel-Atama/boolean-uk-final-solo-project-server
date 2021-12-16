-- AddForeignKey
ALTER TABLE "UsersOnUsers" ADD CONSTRAINT "UsersOnUsers_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnUsers" ADD CONSTRAINT "UsersOnUsers_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
