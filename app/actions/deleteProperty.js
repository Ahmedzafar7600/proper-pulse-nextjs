'use server'
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperties(propertyId) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {  // ✅ Fixed Typo
        throw Error('User Id Required');
    }

    const { userId } = sessionUser;
    const property = await Property.findById(propertyId);
    
    if (!property) throw new Error('Property Not Found');
    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Extracting publicIds from image URLs
    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/');
        return parts.at(-1).split('.').at(0);
    });

    // Delete images from Cloudinary if they exist
    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('propertypulse/' + publicId); // ✅ Fixed Typo
        }
    }

    // Delete property
    await property.deleteOne(); // ✅ Added await

    // Revalidate the cache
    revalidatePath('/', 'layout');
}

export default deleteProperties;
