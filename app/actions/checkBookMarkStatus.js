'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function checkbookMarkStatus(propertyId) {
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

  let isBookMarked = user.bookmarks.includes(propertyId); // ✅ fixed here

  

  return {
    isBookMarked
  };
}

export default checkbookMarkStatus;
