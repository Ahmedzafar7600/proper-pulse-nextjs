'user server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookMarkProperty(propertyId){

  await connectDB();
  const sessionUser= await getSessionUser();

  if(!sessionUser || !sessionUser.userId){
    throw new Error('User Id is Required');
  }

  const {userId}=sessionUser;

  const user=await User.findById(userId);

  let isBookMarked= user.bookMarks.includes(propertyId);

  let message;

  if(isBookMarked){
    /// if already bookmarked then removed
    user.bookMarks.pull(propertyId);
    message='Bookmark Removed';
    isBookMarked=false;
  }
  else{
     /// if already bookmarked then add it
     user.bookMarks.push(propertyId);
    message='Bookmark Added';
    isBookMarked=true;
  }

  await user.save();

  revalidatePath('/properties/saved','page');

  return {
    message,
    isBookMarked
  }


}


export default bookMarkProperty;