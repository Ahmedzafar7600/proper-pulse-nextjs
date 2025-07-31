'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import  Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


async function getUnReadMessageCount() {
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

  const count = await Message.countDocuments({
    recipient: userId,
    read: false
  });

  return {count};
}

export default getUnReadMessageCount;
