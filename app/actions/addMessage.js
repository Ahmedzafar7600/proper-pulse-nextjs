'use server'
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import Message from "@/models/Message";

async function addMessage(previousState,formData) {
    console.log(formData);
    console.log(formData.get('name'));

    
    await connectDB();
    const sessionUser=await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {userId} =sessionUser;


    if(userId === formData.get('receipient')) {
        return { error: 'You cannot send a message to yourself' };

    }       

    const messageData = {
        sender: userId,
        receipient: formData.get('receipient'),
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body'),
    };

    const newMessage = new Message(messageData);
    await newMessage.save();
    return { submitted: true, message: 'Message sent successfully' };
}

export default addMessage;