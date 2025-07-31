'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {  // ✅ Fixed Typo
        throw Error('User Id Required');
    }

    const { userId } = sessionUser;
    const message = await Message.findById(messageId);

    if (!message) throw new Error('Message Not Found');
    if (message.receipient.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Delete message
    await message.deleteOne(); // ✅ Added await

    // Revalidate the cache
    revalidatePath('/', 'layout');
}

export default deleteMessage;
