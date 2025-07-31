'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import  Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is Required');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found');
    }

    if(message.receipient.toString() !== userId) {
      throw new Error('You are not authorized to mark this message as read');
    } 

      message.read = !message.read;
      await message.save();

      revalidatePath('/messages','page'); // Revalidate the messages page to reflect the changes

  return {
    isMessageRead: message.read
  };
}

export default markMessageAsRead;
